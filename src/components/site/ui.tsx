import type { ReactNode } from "react";
import { SHOW_REVIEW_NOTES, whatsappUrl } from "@/config/site";
import { cn } from "@/lib/utils";
import { trackWhatsAppConversion } from "@/lib/meta-pixel";

export function WaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("h-5 w-5 fill-current", className)}>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

type WaProps = {
  message: string;
  refCode: string;
  children: ReactNode;
  variant?: "lime" | "limeOutline" | "link" | "blue";
  className?: string;
};

const variants = {
  lime: "bg-lime text-ink hover:brightness-95 px-6 py-3.5 text-base font-semibold shadow-[0_10px_30px_-10px_rgb(226_247_71/0.6)]",
  limeOutline: "bg-lime/15 border border-lime/60 text-lime hover:bg-lime hover:text-ink px-4 py-2 text-sm font-medium",
  link: "justify-start rounded-none text-lime underline underline-offset-4 py-2 text-sm",
  blue: "bg-blue-strong text-on-dark hover:brightness-110 px-6 py-3.5 text-base font-semibold",
};

export function WaButton({ message, refCode, children, variant = "lime", className }: WaProps) {
  return (
    <a
      href={whatsappUrl(message, refCode)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsAppConversion(refCode)}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime",
        variants[variant],
        className,
      )}
    >
      {variant !== "link" && <WaIcon />}
      {children}
    </a>
  );
}

export function ReviewNote({ children, className }: { children: ReactNode; className?: string }) {
  if (!SHOW_REVIEW_NOTES) return null;
  return <p className={cn("review-note", className)}>{children}</p>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("font-mono text-xs uppercase tracking-[0.16em]", className)}>{children}</p>;
}

export function Check({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={cn("h-5 w-5 shrink-0", className)}>
      <circle cx="10" cy="10" r="10" className="fill-success/15" />
      <path d="m6 10.5 2.5 2.5L14 7.5" className="stroke-success" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** Renders **key phrases** as <strong class="kp">; bold only on phones via CSS. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return <>{parts.map((p, i) => (i % 2 ? <strong key={i} className="kp">{p}</strong> : p))}</>;
}
