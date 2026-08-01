"use client";

import { useEffect, useState } from "react";

import ProductForm from "./ProductForm";

type Props = {
    id: string;
};

export default function EditProductForm({ id }: Props) {
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            const res = await fetch(`/api/products/${id}`);

            const data = await res.json();

            setProduct({
                ...data,
                category: data.category?._id,
            });
        }

        fetchProduct();
    }, [id]);

    if (!product) {
        return <p>Loading...</p>;
    }

    return <ProductForm product={product} />;
}
