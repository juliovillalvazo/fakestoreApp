import { Product } from "@/types";
import { useCallback, useState } from "react";
import { useDB } from "./useDB"
import { useFocusEffect } from "@react-navigation/native";

export const useGetProducts = () => {
    const { getProducts } = useDB();
    const [products, setProducts] = useState<Product[]>([]);

    const loadProducts = useCallback(async () => {
        const products = await getProducts();
        setProducts(products as Product[]);
    }, [getProducts]);

    useFocusEffect(
        useCallback(() => {
            loadProducts();
        }, [loadProducts])
    );

    return { products };
}