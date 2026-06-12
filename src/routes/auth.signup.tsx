import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthPage } from "@/components/app/AuthForms";
import { getSession } from "@/lib/api/auth.functions";

export const Route = createFileRoute("/auth/signup")({
  beforeLoad: async () => {
    const session = await getSession();
    if (session.user) throw redirect({ to: "/dashboard" });
  },
  component: SignupRoute,
});

function SignupRoute() {
  return <AuthPage mode="signup" />;
}
