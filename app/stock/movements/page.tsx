import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import StockMovement from "@/models/StockMovement";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function StockMovementsPage() {
  await connectDB();

  const movements = await StockMovement.find()
    .populate("product", "name sku")
    .sort({ createdAt: -1 });

  return (
    <main className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Stock Movement History
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track all entries and exits in your warehouse.
          </p>
        </div>
        <Link
          href="/stock/movements/create"
          className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition-colors shadow-sm"
        >
          + New Movement
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {movements.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="text-4xl mb-4">📭</p>
            <p className="font-medium">No movements recorded yet.</p>
            <p className="text-sm">Start by recording a stock movement.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-4 font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-4 font-medium text-gray-500 uppercase tracking-wider">Note</th>
                  <th className="px-6 py-4 font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {movements.map((movement) => (
                  <tr key={movement._id.toString()} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {movement.product?.name || "Unknown Product"}
                      <span className="block text-xs text-gray-400 font-normal">
                        {movement.product?.sku || ""}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          movement.type === "IN"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {movement.type === "IN" ? "IN (Entry)" : "OUT (Exit)"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {movement.type === "IN" ? "+" : "-"}{movement.quantity}
                    </td>
                    <td className="px-6 py-4 text-gray-500 truncate max-w-[150px]">
                      {movement.note || "-"}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">
                      {formatDate(movement.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}