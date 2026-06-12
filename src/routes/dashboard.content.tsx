import { createFileRoute } from "@tanstack/react-router";
import { ContentWorkspace } from "@/components/app/ContentWorkspace";
import { getDashboardData } from "@/lib/api/content.functions";

export const Route = createFileRoute("/dashboard/content")({
  loader: async () => getDashboardData(),
  component: ContentRoute,
});

function ContentRoute() {
  const data = Route.useLoaderData();
  return <ContentWorkspace initialItems={data.recentContent} />;
}
