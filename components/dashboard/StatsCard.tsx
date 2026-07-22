interface StatsCardProps {
  title: string;
  value: string;
  status: string;
  statusColor?: string;
}

export default function StatsCard({
  title,
  value,
  status,
  statusColor = "text-green-500",
}: StatsCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-slate-400">
          {title}
        </span>

        <span className={`text-sm font-medium ${statusColor}`}>
          {status}
        </span>
      </div>

      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}