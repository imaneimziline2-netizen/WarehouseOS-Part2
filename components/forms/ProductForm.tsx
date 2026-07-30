"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

type Category = {
    _id: string;
    name: string;
};

type ProductFormData = {
    name: string;
    sku: string;
    description: string;
    category: string;
    price: number;
    quantity: number;
};

type FieldErrors = {
    name?: string[];
    sku?: string[];
    description?: string[];
    category?: string[];
    price?: string[];
    quantity?: string[];
};

export default function ProductForm() {
    const router = useRouter();

    const [categories, setCategories] = useState<Category[]>([]);

    const [formData, setFormData] = useState<ProductFormData>({
        name: "",
        sku: "",
        description: "",
        category: "",
        price: 0,
        quantity: 0,
    });

    const [errors, setErrors] = useState<FieldErrors>({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

   useEffect(() => {
  async function fetchCategories() {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();

      console.log(data); 

      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  }

  fetchCategories(); 
}, []);

    function handleChange(
        e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]:
                name === "price" || name === "quantity" ? Number(value) : value,
        });
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);
        setErrors({});
        setServerError("");

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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

            router.push("/products");
        } catch (error) {
            console.error(error);

            setServerError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="border-slate-200 shadow-lg">
            <CardHeader>
                <h2 className="text-2xl font-bold">Add Product</h2>

                <p className="text-sm text-slate-500">
                    Create a new product for your warehouse.
                </p>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {serverError && (
                        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {serverError}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label>Product Name</Label>

                        <Input
                            name="name"
                            placeholder="Wireless Mouse"
                            value={formData.name}
                            onChange={handleChange}
                        />

                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name[0]}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>SKU</Label>

                        <Input
                            name="sku"
                            placeholder="WM-001"
                            value={formData.sku}
                            onChange={handleChange}
                        />

                        {errors.sku && (
                            <p className="text-sm text-red-500">
                                {errors.sku[0]}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>

                        <textarea
                            name="description"
                            placeholder="Product description..."
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full rounded-md border border-slate-300 p-2"
                            rows={4}
                        />

                        {errors.description && (
                            <p className="text-sm text-red-500">
                                {errors.description[0]}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Category</Label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full rounded-md border border-slate-300 p-2"
                        >
                            <option value="">Choose Category</option>

                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        {errors.category && (
                            <p className="text-sm text-red-500">
                                {errors.category[0]}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Price</Label>

                        <Input
                            type="number"
                            name="price"
                            placeholder="0"
                            value={formData.price}
                            onChange={handleChange}
                        />

                        {errors.price && (
                            <p className="text-sm text-red-500">
                                {errors.price[0]}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Quantity</Label>

                        <Input
                            type="number"
                            name="quantity"
                            placeholder="0"
                            value={formData.quantity}
                            onChange={handleChange}
                        />

                        {errors.quantity && (
                            <p className="text-sm text-red-500">
                                {errors.quantity[0]}
                            </p>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Creating..." : "Create Product"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
