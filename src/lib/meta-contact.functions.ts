import { createServerFn } from "@tanstack/react-start";
import { getRequest, getRequestHeader, getRequestIP } from "@tanstack/react-start/server";
import { META_PIXEL_ID } from "@/config/site";

type MetaContactInput = { eventId: string; ref: string };

function validateContact(input: unknown): MetaContactInput {
  if (input == null || typeof input !== "object") throw new Error("Invalid conversion payload");
  const { eventId, ref } = input as Record<string, unknown>;
  if (typeof eventId !== "string" || !/^[a-f0-9-]{36}$/i.test(eventId)) throw new Error("Invalid conversion event");
  if (typeof ref !== "string" || !/^[a-z0-9-]{1,64}$/.test(ref)) throw new Error("Invalid conversion origin");
  return { eventId, ref };
}

function cookie(name: string): string | undefined {
  for (const part of (getRequestHeader("cookie") ?? "").split(";")) {
    const separator = part.indexOf("=");
    if (separator >= 0 && part.slice(0, separator).trim() === name) {
      return part.slice(separator + 1).trim().slice(0, 255) || undefined;
    }
  }
  return undefined;
}

function sourceUrl(): string {
  const requestUrl = new URL(getRequest().url);
  const referer = getRequestHeader("referer");
  if (referer) {
    try {
      const url = new URL(referer);
      if (url.origin === requestUrl.origin) {
        url.search = "";
        url.hash = "";
        return url.toString();
      }
    } catch {
      // Use the site origin below.
    }
  }
  return `${requestUrl.origin}/pt-br`;
}

export const reportMetaContact = createServerFn({ method: "POST" })
  .inputValidator(validateContact)
  .handler(async ({ data }) => {
    const accessToken = process.env["META_ACCESS_TOKEN"];
    if (!accessToken) return { sent: false as const, detail: "not_configured" as const };

    const ip = (getRequestHeader("cf-connecting-ip") ?? getRequestIP({ xForwardedFor: true }))?.slice(0, 64);
    const userAgent = getRequestHeader("user-agent")?.slice(0, 512);
    if (!ip || !userAgent) return { sent: false as const, detail: "missing_client_data" as const };

    const userData: Record<string, string> = {
      client_ip_address: ip,
      client_user_agent: userAgent,
    };
    const fbp = cookie("_fbp");
    const fbc = cookie("_fbc");
    if (fbp) userData["fbp"] = fbp;
    if (fbc) userData["fbc"] = fbc;

    try {
      const response = await fetch(`https://graph.facebook.com/v23.0/${META_PIXEL_ID}/events`, {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [{
            event_name: "Contact",
            event_time: Math.floor(Date.now() / 1000),
            event_id: data.eventId,
            action_source: "website",
            event_source_url: sourceUrl(),
            user_data: userData,
            custom_data: { content_name: "WhatsApp", content_category: data.ref },
          }],
        }),
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) {
        console.error(`Meta Conversions API returned ${response.status}`);
        return { sent: false as const, detail: "provider_error" as const, httpStatus: response.status };
      }
      return { sent: true as const };
    } catch (error) {
      console.error("Meta Conversions API request failed", error);
      return { sent: false as const, detail: "request_failed" as const };
    }
  });
