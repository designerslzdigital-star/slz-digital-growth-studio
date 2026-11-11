import { createFileRoute } from "@tanstack/react-router";
import { getRouterInstance } from "@tanstack/react-start";
import { isSitemapRouteIncluded, sitemapPathForLocation, sitemapStaticPaths, sitemapXML, type SitemapEntry } from "@/lib/sitemap";
import { LANGS } from "@/i18n";
import { SITE_URL } from "@/i18n/head";

const BASE_URL = `${SITE_URL}/`;

const LANG_ROUTES = [
  { id: "/$lang/", to: "/$lang" },
  { id: "/$lang/privacidade", to: "/$lang/privacidade" },
  { id: "/$lang/termos", to: "/$lang/termos" },
] as const;

export const Route = createFileRoute("/sitemap.xml")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async () => {
        const router = await getRouterInstance();
        const entries: SitemapEntry[] = sitemapStaticPaths(router).map((path) => ({ path }));
        for (const r of LANG_ROUTES) {
          if (!isSitemapRouteIncluded(router.routesById[r.id])) continue;
          for (const l of LANGS) {
            const location = router.buildLocation({ to: r.to, params: { lang: l.slug }, search: () => ({}), hash: "" });
            const path = sitemapPathForLocation(router, location, r.id);
            if (path) entries.push({ path });
          }
        }
        if (entries.length === 0) {
          return new Response("No pages are included in this sitemap.", { status: 404, headers: { "Cache-Control": "no-store" } });
        }
        return new Response(sitemapXML(BASE_URL, entries), {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
