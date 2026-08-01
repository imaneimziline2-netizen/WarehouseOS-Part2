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

  console.log(products)

  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <Link
          href="/products/create"
          className="rounded-md bg-black px-4 py-2 text-white"
        >
          Add Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">SKU</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-t"
              >
                <td className="p-3">
                  {product.name}
                </td>

                <td className="p-3">
                  {product.sku}
                </td>

                <td className="p-3">
                  {product.category?.name}
                </td>

                <td className="p-3">
                  {product.price} MAD
                </td>

                <td className="p-3">
                  {product.quantity}
                </td>

                <td className="p-3 flex gap-3">
                  <Link
                    href={`/products/${product._id}`}
                    className="text-blue-600"
                  >
                    View
                  </Link>

                  <Link
                    href={`/products/${product._id}/edit`}
                    className="text-green-600"
                  >
                    Edit
                  </Link>

                  <ArchiveProductButton id={product._id.toString()} />
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-slate-500"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}