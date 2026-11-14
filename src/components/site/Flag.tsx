import type { LangSlug } from "@/i18n";

/** Language slugs plus the country codes used outside the language switcher. */
export type FlagCode = LangSlug | "ie" | "uy";

/** SVG flags: emoji flags don't render on Windows (shows "BR"). Official flag colours are content, not theme. */
export function Flag({ slug, className = "h-4 w-6" }: { slug: FlagCode; className?: string }) {
  const common = { className: `${className} shrink-0 rounded-[3px]`, "aria-hidden": true as const, viewBox: "0 0 30 20" };
  switch (slug) {
    case "ie":
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#169B62" />
          <rect x="10" width="10" height="20" fill="#FFFFFF" />
          <rect x="20" width="10" height="20" fill="#FF883E" />
        </svg>
      );
    case "uy":
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#FFFFFF" />
          <rect y="2.22" width="30" height="2.22" fill="#0038A8" />
          <rect y="6.67" width="30" height="2.22" fill="#0038A8" />
          <rect y="11.11" width="30" height="2.22" fill="#0038A8" />
          <rect y="15.56" width="30" height="2.22" fill="#0038A8" />
          <rect width="11.11" height="11.11" fill="#FFFFFF" />
          <circle cx="5.56" cy="5.56" r="2.4" fill="#FCD116" />
        </svg>
      );
    case "pt-br":
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#009C3B" />
          <path d="M15 3 27 10 15 17 3 10Z" fill="#FFDF00" />
          <circle cx="15" cy="10" r="4" fill="#002776" />
        </svg>
      );
    case "pt-pt":
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#FF0000" />
          <rect width="12" height="20" fill="#006600" />
          <circle cx="12" cy="10" r="3.5" fill="#FFCC00" />
        </svg>
      );
    case "es":
      return (
        <svg {...common}>
          <rect width="30" height="20" fill="#AA151B" />
          <rect y="5" width="30" height="10" fill="#F1BF00" />
        </svg>
      );
    default:
      return (
        <svg {...common} viewBox="0 0 60 40">
          <rect width="60" height="40" fill="#012169" />
          <path d="M0 0 60 40M60 0 0 40" stroke="#FFF" strokeWidth="8" />
          <path d="M0 0 60 40M60 0 0 40" stroke="#C8102E" strokeWidth="3" />
          <path d="M30 0v40M0 20h60" stroke="#FFF" strokeWidth="12" />
          <path d="M30 0v40M0 20h60" stroke="#C8102E" strokeWidth="7" />
        </svg>
      );
  }
}
