import { notFound } from "next/navigation";

import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  await connectDB();

  const product = await Product.findById(id).populate(
    "category"
  );

  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Product Details
      </h1>

      <div className="rounded-lg border p-6 space-y-4">
        <div>
          <span className="font-semibold">
            Name:
          </span>{" "}
          {product.name}
        </div>

        <div>
          <span className="font-semibold">
            SKU:
          </span>{" "}
          {product.sku}
        </div>

        <div>
          <span className="font-semibold">
            Description:
          </span>{" "}
          {product.description}
        </div>

        <div>
          <span className="font-semibold">
            Category:
          </span>{" "}
          {product.category?.name}
        </div>

        <div>
          <span className="font-semibold">
            Price:
          </span>{" "}
          {product.price} MAD
        </div>

        <div>
          <span className="font-semibold">
            Stock:
          </span>{" "}
          {product.quantity}
        </div>
      </div>
    </main>
  );
}