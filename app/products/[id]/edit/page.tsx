import EditProductForm from "@/components/forms/EditProductForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Product
      </h1>

      <EditProductForm id={id} />
    </main>
  );
}