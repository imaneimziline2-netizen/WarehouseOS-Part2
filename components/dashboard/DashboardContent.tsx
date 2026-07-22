import StatsCard from "./StatsCard";
import UserCard from "./UserCard";

export default function DashboardContent() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-4xl font-bold">
          Welcome back, John!
        </h1>

        <p className="mt-2 text-slate-500">
          Your warehouse operations are running within optimal parameters.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard
          title="Active Shipments"
          value="24"
          status="+4.2%"
        />

        <StatsCard
          title="Low Stock Alerts"
          value="08"
          status="Review Now"
          statusColor="text-orange-500"
        />

        <StatsCard
          title="System Status"
          value="99.9%"
          status="Stable"
        />
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* User */}
        <div>
          <UserCard />
        </div>

        {/* Right Side */}
        <div className="lg:col-span-2 rounded-xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Warehouse Overview
          </h2>

          <p className="mt-2 text-slate-500">
            Product management and stock statistics will be added
            in the next sprint.
          </p>

          <div className="mt-8 flex h-72 items-center justify-center rounded-lg border border-dashed">
            <span className="text-slate-400">
              Future Charts & Inventory Data
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}