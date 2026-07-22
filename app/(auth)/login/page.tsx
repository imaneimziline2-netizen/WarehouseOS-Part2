import Logo from "@/components/layout/Logo";
import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <Logo />
        <LoginForm />
      </div>
    </main>
  );
}