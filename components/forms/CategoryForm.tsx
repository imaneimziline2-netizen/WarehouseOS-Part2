"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

type CategoryFormData = {
  name: string;
  description: string;
};

type FieldErrors = {
  name?: string[];
  description?: string[];
};

export default function CategoryForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setErrors({});
    setServerError("");

    try {
      const response = await fetch("/api/categories", {
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

      router.push("/categories");
      router.refresh();
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
        <h2 className="text-2xl font-bold">
          Create Category
        </h2>

        <p className="text-sm text-slate-500">
          Add a new category.
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {serverError && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {serverError}
            </div>
          )}

          <div className="space-y-2">
            <Label>Name</Label>

            <Input
              name="name"
              placeholder="Electronics"
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
            <Label>Description</Label>

            <textarea
              name="description"
              placeholder="Category description..."
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

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Category"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}