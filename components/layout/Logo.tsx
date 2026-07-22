import { Warehouse } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white">
        <Warehouse className="h-8 w-8" />
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold">WarehouseOS</h1>
        <p className="text-slate-500">
          Next-generation Inventory Management
        </p>
      </div>
    </div>
  );
}