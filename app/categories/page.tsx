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
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your product categories.</p>
        </div>

        <Link href="/categories/create">
          <Button className="bg-black hover:bg-gray-900 text-white rounded-lg px-5 py-2.5 text-sm font-medium shadow-sm">
            + Create Category
          </Button>
        </Link>
      </div>

      {/* Content */}
      {categories.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-300 rounded-xl bg-white">
          <p className="text-gray-500">No categories found. Create your first one!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category._id.toString()}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <h2 className="font-semibold text-lg text-gray-900">
                  {category.name}
                </h2>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                {category.description || "No description provided."}
              </p>
              {/* <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                <Link href={`/categories/${category._id}`} className="text-xs font-medium text-gray-600 hover:text-black">
                  View Details →
                </Link>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}