"use client";

import StatsCard from "./StatsCard";
import UserCard from "./UserCard";
import { useSession } from "next-auth/react";

export default function DashboardContent() {
    const { status, data } = useSession();

    if (status == "loading") {
        return <p>Loading...</p>;
    }

    return (
        <div className="space-y-8">
            <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-700 p-8 text-white">
                <h1 className="text-4xl font-bold">
                    Welcome back, {data?.user?.name} 👋
                </h1>

                <p className="mt-3 text-slate-200">
                    Manage your warehouse, inventory and shipments from one
                    place.
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-6 md:grid-cols-3">
                <StatsCard
                    title="Products"
                    value="0"
                    status="No products yet"
                />

                <StatsCard
                    title="Categories"
                    value="0"
                    status="Create your first category"
                />

                <StatsCard
                    title="Warehouses"
                    value="1"
                    status="Main Warehouse"
                />
            </div>

            {/* Bottom */}
            <div className="grid gap-6 lg:grid-cols-3">
                <UserCard session={data} />

                <div className="lg:col-span-2 rounded-xl border bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-semibold">
                        Warehouse Overview
                    </h2>

                    <p className="mt-2 text-slate-500">
                        Your warehouse is ready. Start by creating products,
                        categories and suppliers.
                    </p>

                    <div className="mt-8 grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border p-5">
                            <h3 className="font-semibold">Next Step</h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Create your first product and organize it into a
                                category.
                            </p>
                        </div>

                        <div className="rounded-lg border p-5">
                            <h3 className="font-semibold">Inventory</h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Inventory tracking will appear here after adding
                                products.
                            </p>
                        </div>

                        <div className="rounded-lg border p-5">
                            <h3 className="font-semibold">Shipments</h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Incoming and outgoing shipments will be
                                displayed here.
                            </p>
                        </div>

                        <div className="rounded-lg border p-5">
                            <h3 className="font-semibold">Reports</h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Warehouse reports and analytics will be
                                available soon.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
