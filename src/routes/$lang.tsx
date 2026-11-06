import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { isLangSlug } from "@/i18n";

export const Route = createFileRoute("/$lang")({
  beforeLoad: ({ params }) => {
    if (!isLangSlug(params.lang)) throw notFound();
  },
  component: () => <Outlet />,
});
