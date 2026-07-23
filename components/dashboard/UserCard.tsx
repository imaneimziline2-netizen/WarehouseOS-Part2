import { Session } from "next-auth";
import { Mail, User } from "lucide-react";

type UserCardProps = {
  session: Session | null;
};

export default function UserCard({
  session,
}: UserCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-2xl font-bold text-white">
          {session?.user?.name?.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="mt-6 text-center">
        <h2 className="text-xl font-semibold">
          {session?.user?.name}
        </h2>

        <p className="text-sm text-slate-500">
          Warehouse Administrator
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3">
          <Mail size={18} />
          <span>{session?.user?.email}</span>
        </div>

        <div className="flex items-center gap-3">
          <User size={18} />
          <span>Active Session</span>
        </div>
      </div>
    </div>
  );
}