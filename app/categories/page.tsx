import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { connectDB } from "@/lib/mongodb";
import Category from "@/models/Category";

export default async function CategoriesPage() {
  await connectDB();

  const categories = await Category.find({
    archived: false,
  }).lean();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Categories
        </h1>

        <Link href="/categories/create">
          <Button>Create Category</Button>
        </Link>
      </div>

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div className="space-y-4">
          {categories.map((category) => (
            <div
              key={category._id.toString()}
              className="rounded-lg border p-4"
            >
              <h2 className="font-semibold">
                {category.name}
              </h2>

              <p className="text-gray-500">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}