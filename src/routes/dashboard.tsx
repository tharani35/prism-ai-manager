import { Outlet, createFileRoute, redirect, useRouterState } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { DashboardHome } from "@/components/app/DashboardHome";
import { getSession } from "@/lib/api/auth.functions";
import { getDashboardData } from "@/lib/api/content.functions";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session.user) throw redirect({ to: "/auth/login" });
    return { session };
  },
  loader: async () => getDashboardData(),
  component: DashboardRoute,
});

function DashboardRoute() {
  const { session } = Route.useRouteContext();
  const data = Route.useLoaderData();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <AppShell session={session}>
      {pathname === "/dashboard" ? <DashboardHome data={data} /> : <Outlet />}
    </AppShell>
  );
}
