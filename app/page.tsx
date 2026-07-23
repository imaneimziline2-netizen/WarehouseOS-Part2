import { auth } from "@/lib/auth";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    redirect("/dashboard");
    // return <DashboardContent session={session} />;
}
