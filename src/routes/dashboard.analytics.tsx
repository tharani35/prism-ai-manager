import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsView } from "@/components/app/AnalyticsView";
import { getDashboardData } from "@/lib/api/content.functions";

export const Route = createFileRoute("/dashboard/analytics")({
  loader: async () => getDashboardData(),
  component: AnalyticsRoute,
});

function AnalyticsRoute() {
  const data = Route.useLoaderData();
  return <AnalyticsView data={data} />;
}
