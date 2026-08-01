"use client";

import { useRouter } from "next/navigation";

type Props = {
    id: string;
};

export default function ArchiveProductButton({ id }: Props) {
    const router = useRouter();

    async function handleArchive() {
        const confirmed = confirm(
            "Are you sure you want to archive this product?",
        );

        if (!confirmed) return;
        const response = await fetch(`/api/products/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();

        console.log(data);

        if (response.ok) {
            router.refresh();
        } else {
            alert(data.message);
        }
    }

    return (
        <button
            onClick={handleArchive}
            className="text-red-600 hover:underline"
        >
            Archive
        </button>
    );
}
