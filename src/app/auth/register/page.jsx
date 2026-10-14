import AuthShell from "@/components/pages/auth/AuthShell";
import RegisterForm from "@/components/pages/auth/RegisterForm";

export const metadata = {
  title: "Create account | Loyanox Mentor",
};

export default function RegisterPage() {
  return (
    <AuthShell showFeedback={false}>
      <RegisterForm />
    </AuthShell>
  );
}
