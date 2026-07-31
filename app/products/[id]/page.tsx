import { notFound } from "next/navigation";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { Link } from "lucide-react";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ProductDetailsPage({ params }: Props) {
    const { id } = await params;

    await connectDB();

    const product = await Product.findById(id);

    if (!product) {
        notFound();
    }

    return (
        <main className="mx-auto max-w-6xl p-8">
            <Link
                href="/products"
                className="mb-6 inline-block text-sm text-slate-500 hover:text-black"
            >
                ← Back
            </Link>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold">{product.name}</h1>

                    <p className="mt-1 text-slate-500">SKU : {product.sku}</p>
                </div>

                <button className="rounded-lg bg-black px-5 py-3 text-white">
                    Edit Product
                </button>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
                {/* Product Image */}

                <div className="rounded-xl border bg-white p-4">
                    <p className="mt-4 text-center text-sm text-slate-500">
                        Product Preview
                    </p>
                </div>

                {/* Stock */}

                <div className="rounded-xl border bg-white p-6">
                    <p className="text-xs uppercase tracking-widest text-slate-500">
                        Inventory Level
                    </p>

                    <h2 className="mt-3 text-5xl font-bold">
                        {product.quantity}
                    </h2>

                    <p className="mb-6">Units</p>

                    <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                        <div
                            className="h-full rounded-full bg-orange-500"
                            style={{
                                width: `${Math.min(product.quantity, 100)}%`,
                            }}
                        />
                    </div>

                    <p className="mt-3 text-sm text-slate-500">
                        Current warehouse stock
                    </p>
                </div>

                {/* Price */}

                <div className="rounded-xl border bg-white p-6">
                    <p className="text-xs uppercase tracking-widest text-slate-500">
                        Unit Price
                    </p>

                    <h2 className="mt-3 text-5xl font-bold">{product.price}</h2>

                    <p className="text-lg">MAD</p>

                    <hr className="my-6" />

                    <div className="flex justify-between">
                        <span>Total Stock Value</span>

                        <span className="font-bold">
                            {product.price * product.quantity} MAD
                        </span>
                    </div>
                </div>
            </div>

            {/* Information */}

            <div className="mt-6 rounded-xl border bg-white">
                <div className="border-b p-5">
                    <h2 className="font-bold uppercase tracking-widest">
                        Product Information
                    </h2>
                </div>

                <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <p className="text-xs text-slate-500">Category</p>

                        <p className="font-semibold">
                            {product.category?.name}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-500">SKU</p>

                        <p className="font-semibold">{product.sku}</p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-500">Price</p>

                        <p className="font-semibold">{product.price} MAD</p>
                    </div>

                    <div>
                        <p className="text-xs text-slate-500">Quantity</p>

                        <p className="font-semibold">{product.quantity}</p>
                    </div>
                </div>
            </div>

            {/* Description */}

            <div className="mt-6 rounded-xl border bg-white p-6">
                <h2 className="mb-4 font-bold uppercase tracking-widest">
                    Description
                </h2>

                <p className="leading-7 text-slate-600">
                    {product.description}
                </p>
            </div>
        </main>
    );
}
