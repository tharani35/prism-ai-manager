import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthPage } from "@/components/app/AuthForms";
import { getSession } from "@/lib/api/auth.functions";

export const Route = createFileRoute("/auth/login")({
  beforeLoad: async () => {
    const session = await getSession();
    if (session.user) throw redirect({ to: "/dashboard" });
  },
  component: LoginRoute,
});

function LoginRoute() {
  return <AuthPage mode="login" />;
}
