import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserCard() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/avatar.jpg" alt="John Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>

        <h2 className="mt-4 text-2xl font-semibold">
          John Doe
        </h2>

        <p className="text-sm text-slate-500">
          Logistics Administrator
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="text-sm text-slate-500">Email</span>
          <span className="font-medium">john@example.com</span>
        </div>

        <div className="flex justify-between border-b pb-2">
          <span className="text-sm text-slate-500">Department</span>
          <span className="font-medium">Central Hub</span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm text-slate-500">Access Level</span>

          <span className="rounded bg-slate-100 px-2 py-1 text-sm">
            Admin
          </span>
        </div>
      </div>
    </div>
  );
}