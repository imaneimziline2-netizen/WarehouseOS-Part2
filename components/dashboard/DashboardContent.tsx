"use client";

import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import UserCard from "./UserCard";
import { useSession } from "next-auth/react";

type DashboardStats = {
  totalProducts: number;
  totalCategories: number;
  totalStock: number;
  totalValue: number;
};

export default function DashboardContent() {
    const { status, data } = useSession();
    const [stats, setStats] = useState<DashboardStats>({
        totalProducts: 0,
        totalCategories: 0,
        totalStock: 0,
        totalValue: 0,
    });
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch("/api/dashboard/stats");
                const json = await response.json();
                
                if (json.success) {
                    setStats(json.data);
                }
            } catch (error) {
                console.error("Failed to fetch stats:", error);
            } finally {
                setLoadingStats(false);
            }
        }

        fetchStats();
    }, []);

    if (status === "loading") {
        return <p className="p-6">Loading user session...</p>;
    }

    return (
        <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, {data?.user?.name || "User"} 👋
                </h1>
                <p className="text-gray-500 text-sm">
                    Manage your warehouse, inventory and shipments from one place.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
                <StatsCard 
                    title="Total Products" 
                    value={loadingStats ? "..." : stats.totalProducts.toString()} 
                    status="Active" 
                    statusColor="text-orange-500" 
                />
                <StatsCard 
                    title="Categories" 
                    value={loadingStats ? "..." : stats.totalCategories.toString()} 
                    status="Active" 
                    statusColor="text-blue-500" 
                />
                <StatsCard 
                    title="Total Stock" 
                    value={loadingStats ? "..." : stats.totalStock.toString()} 
                    status="Units in WH" 
                    statusColor="text-green-500" 
                />
                <StatsCard 
                    title="Inventory Value" 
                    value={loadingStats ? "..." : `${stats.totalValue} MAD`} 
                    status="Total Worth" 
                    statusColor="text-purple-500" 
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-1">
                    <UserCard session={data} />
                </div>

                <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900">Warehouse Overview</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Monitor your inventory health at a glance.
                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                            <h3 className="font-medium text-gray-800 text-sm">Stock Status</h3>
                            <p className="mt-1 text-xs text-gray-500">
                                {loadingStats ? "Loading..." : `You have ${stats.totalProducts} active products.`}
                            </p>
                        </div>
                        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                            <h3 className="font-medium text-gray-800 text-sm">Categories</h3>
                            <p className="mt-1 text-xs text-gray-500">
                                {loadingStats ? "Loading..." : `Organized into ${stats.totalCategories} categories.`}
                            </p>
                        </div>
                        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                            <h3 className="font-medium text-gray-800 text-sm">Total Units</h3>
                            <p className="mt-1 text-xs text-gray-500">
                                {loadingStats ? "Loading..." : `${stats.totalStock} items in stock right now.`}
                            </p>
                        </div>
                        <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                            <h3 className="font-medium text-gray-800 text-sm">Total Value</h3>
                            <p className="mt-1 text-xs text-gray-500">
                                {loadingStats ? "Loading..." : `${stats.totalValue} MAD total value.`}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}