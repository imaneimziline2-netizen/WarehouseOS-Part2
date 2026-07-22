import Logo from "@/components/layout/Logo";
import RegisterForm from "@/components/forms/RegisterForm" 

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md space-y-8">
        <Logo />
        <RegisterForm />
      </div>
    </main>
  );
}