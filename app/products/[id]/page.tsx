import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Link from "next/link";
import Category from "@/models/Category"; 

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ProductDetailsPage({ params }: Props) {
    const { id } = await params;
    await connectDB();
    const product = await Product.findById(id).populate("category");

    if (!product) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-6xl p-6 bg-gray-50 min-h-screen">
            {/* Back Link */}
            <Link href="/products" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-6 transition-colors">
                ← Back to Products
            </Link>

            {/* Header and CTA */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{product.name}</h1>
                    <p className="text-sm text-gray-500 mt-1">SKU: <span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">{product.sku}</span></p>
                </div>
                <Link href={`/products/${product._id}/edit`} className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition-colors shadow-sm">
                    Edit Product
                </Link>
            </div>

            {/* Top Grid: Image, Stock, Price */}
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Product Image Placeholder */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 flex flex-col items-center justify-center min-h-[200px]">
                    <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center text-4xl mb-4">
                        🖥️
                    </div>
                    <p className="text-sm text-gray-500 font-medium">Product Preview</p>
                </div>

                {/* Stock Card */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">Inventory Level</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <h2 className="text-4xl font-bold text-gray-900">{product.quantity}</h2>
                        <span className="text-sm text-gray-500">Units</span>
                    </div>
                    <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                        <div className="h-full rounded-full bg-gray-900" style={{ width: `${Math.min((product.quantity / 100) * 100, 100)}%` }} />
                    </div>
                    <p className="mt-3 text-xs text-gray-500">Current warehouse stock</p>
                </div>

                {/* Price Card */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">Unit Price</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <h2 className="text-4xl font-bold text-gray-900">{product.price}</h2>
                        <span className="text-sm text-gray-500">MAD</span>
                    </div>
                    <hr className="my-4 border-gray-100" />
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Total Stock Value</span>
                        <span className="font-bold text-gray-900">{product.price * product.quantity} MAD</span>
                    </div>
                </div>
            </div>

            {/* Information Block */}
            <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="border-b border-gray-100 px-6 py-4 bg-gray-50/50">
                    <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Product Information</h2>
                </div>
                <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-400 uppercase">Category</p>
                        <p className="font-medium text-gray-900">{product.category?.name || "-"}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-400 uppercase">SKU</p>
                        <p className="font-mono text-sm text-gray-900">{product.sku}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-400 uppercase">Price</p>
                        <p className="font-medium text-gray-900">{product.price} MAD</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs font-medium text-gray-400 uppercase">Quantity</p>
                        <p className="font-medium text-gray-900">{product.quantity}</p>
                    </div>
                </div>
            </div>

            {/* Description Block */}
            <div className="mt-6 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="mb-3 font-bold text-gray-900 text-sm uppercase tracking-wider">Description</h2>
                <p className="leading-relaxed text-gray-600 text-sm">
                    {product.description || "No description provided for this product."}
                </p>
            </div>
        </main>
    );
}