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
  statusColor = "text-green-600",
}: StatsCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
          {title}
        </span>
        <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gray-50 border border-gray-100 ${statusColor}`}>
          {status}
        </span>
      </div>
      <h2 className="mt-3 text-3xl font-bold text-gray-900 tracking-tight">{value}</h2>
    </div>
  );
}