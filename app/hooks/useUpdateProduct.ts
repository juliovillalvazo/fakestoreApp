import { Product } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useGetSingleProduct } from "./useGetSingleProduct";
import { useDB } from "./useDB";

export const useUpdateProduct = (id: string) => {
    const {product} = useGetSingleProduct(id);
    const {updateProduct} = useDB();
    const [updatedProduct, setUpdatedProduct] = useState<Product | undefined>();

    const handleUpdate = useCallback(() => {
        if (!updatedProduct) {
            return;
        }

        updateProduct(updatedProduct);
    }, [updatedProduct]);

    useEffect(() => {
        setUpdatedProduct(product);
    }, [product, id, setUpdatedProduct]);

    return { updatedProduct, setUpdatedProduct, handleUpdate };
};