import Link from "next/link";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { Button } from "@/components/ui/Button";

export default async function ProductsPage() {
  await connectDB();

  const products = await Product.find({
    archived: false,
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <Link href="/products/create">
          <Button>Add Product</Button>
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
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t"
                >
                  <td className="p-3">{product.name}</td>

                  <td className="p-3">{product.sku}</td>

                  <td className="p-3">
                    {/* {product.category?.name} */}
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

                    <button className="text-red-600">
                      Archive
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}