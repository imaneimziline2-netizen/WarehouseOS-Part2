"use client";

import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type ProductOption = {
  _id: string;
  name: string;
  sku: string;
};

type FormData = {
  productId: string;
  type: "IN" | "OUT";
  quantity: number;
  note: string;
};

type FieldErrors = {
  productId?: string[];
  type?: string[];
  quantity?: string[];
  note?: string[];
};

export default function CreateStockMovementPage() {
  const router = useRouter();
  
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [formData, setFormData] = useState<FormData>({
    productId: "",
    type: "IN",
    quantity: 0,
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");

useEffect(() => {
  async function fetchProducts() {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error("API returned non-array:", data);
        setProducts([]); 
      }
    } catch (error) {
      console.error("Failed to load products", error);
      setProducts([]);
    }
  }
  fetchProducts();
}, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setServerError("");

    try {
      const response = await fetch("/api/stock/movement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors); 
        } else {
          setServerError(data.message);
        }
        return;
      }

      alert("✅ Success! Stock movement recorded successfully!");

      router.push("/dashboard"); 
      router.refresh();
    } catch (error) {
      setServerError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Record Stock Movement</h1>
        <Link href="/dashboard" className="text-sm text-gray-500 hover:text-black">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {serverError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {serverError}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Product</label>
            <select
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="">Select a product</option>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name} ({p.sku})
                </option>
              ))}
            </select>
            {errors.productId && (
              <p className="text-sm text-red-500">{errors.productId[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Movement Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="IN"
                  checked={formData.type === "IN"}
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm text-green-600 font-medium">Stock In (Entry)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="OUT"
                  checked={formData.type === "OUT"}
                  onChange={handleChange}
                  className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                />
                <span className="text-sm text-red-600 font-medium">Stock Out (Exit)</span>
              </label>
            </div>
            {errors.type && (
              <p className="text-sm text-red-500">{errors.type[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="e.g. 10"
            />
            {errors.quantity && (
              <p className="text-sm text-red-500">{errors.quantity[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Note (Optional)</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Add a reason for this movement..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-900 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Record Movement"}
          </button>
        </form>
      </div>
    </main>
  );
}