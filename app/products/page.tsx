import Link from "next/link";

import { connectDB } from "@/lib/mongodb";
import "@/models/Category";
import Product from "@/models/Product"; 
import ArchiveProductButton from "@/components/ArchiveProductButton";

export default async function ProductsPage() {
  await connectDB();

  const products = await Product.find({
    archived: false,
  }).populate("category");

  return (
    <main className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Products</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your inventory and stock.</p>
        </div>

        <Link
          href="/products/create"
          className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition-colors shadow-sm text-center"
        >
          + Add Product
        </Link>
      </div>

      {/* Table Section - هنا غيرنا overflow-hidden لـ overflow-x-auto، وزيدنا min-w للجدول */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm text-left min-w-[800px]">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 font-medium text-gray-500 uppercase tracking-wider">SKU</th>
              <th className="px-6 py-4 font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-4 font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 text-gray-600 font-mono text-xs">
                  {product.sku}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    {product.category?.name || "Uncategorized"}
                  </span>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">
                  {product.price} <span className="text-xs text-gray-400">MAD</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${product.quantity > 10 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {product.quantity}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-end gap-3">
                  <Link
                    href={`/products/${product._id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 underline-offset-2 hover:underline"
                  >
                    View
                  </Link>

                  <Link
                    href={`/products/${product._id}/edit`}
                    className="text-sm font-medium text-gray-600 hover:text-black underline-offset-2 hover:underline"
                  >
                    Edit
                  </Link>

                  <ArchiveProductButton id={product._id.toString()} />
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-4xl mb-2">📦</span>
                    <p className="font-medium">No products found.</p>
                    <p className="text-sm">Get started by adding your first product.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}