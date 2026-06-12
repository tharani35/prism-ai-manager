import { createFileRoute } from "@tanstack/react-router";
import { SettingsView } from "@/components/app/SettingsView";
import { getSession } from "@/lib/api/auth.functions";

export const Route = createFileRoute("/dashboard/settings")({
  loader: async () => getSession(),
  component: SettingsRoute,
});

function SettingsRoute() {
  const session = Route.useLoaderData();
  return <SettingsView session={session} />;
}
