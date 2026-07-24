import LogoutButton from "../LogoutButton";

export default function Footer() {
  return (
    <footer className="border-t bg-white mt-16">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <div>
          <h3 className="font-semibold">WarehouseOS</h3>

          <p className="text-xs text-slate-500">
            © 2025 Logistics Systems Global.
          </p>
        </div>

         <LogoutButton />
      </div>
    </footer>
  );
}