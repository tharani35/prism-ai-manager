import { createFileRoute } from "@tanstack/react-router";
import { ProfileView } from "@/components/app/ProfileView";
import { getSession } from "@/lib/api/auth.functions";

export const Route = createFileRoute("/dashboard/profile")({
  loader: async () => getSession(),
  component: ProfileRoute,
});

function ProfileRoute() {
  const session = Route.useLoaderData();
  return <ProfileView session={session} />;
}
