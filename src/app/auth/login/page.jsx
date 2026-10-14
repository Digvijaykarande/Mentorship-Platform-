import AuthShell from "@/components/pages/auth/AuthShell";
import LoginForm from "@/components/pages/auth/LoginForm";

export const metadata = {
  title: "Sign in | Loyanox Mentor",
};

export default function LoginPage() {
  return (
    <AuthShell>
      <LoginForm />
    </AuthShell>
  );
}
