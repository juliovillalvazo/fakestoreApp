import { Product } from "@/types";
import { useCallback, useState } from "react";
import { useDB } from "./useDB"
import { useFocusEffect } from "@react-navigation/native";

export const useGetProducts = () => {
    const { getProducts, getProductsByCategory } = useDB();
    const [products, setProducts] = useState<Product[]>([]);

    const loadProducts = useCallback(async () => {
        const products = await getProducts();
        setProducts(products as Product[]);
    }, [getProducts]);

    const filterProductsByCategory = useCallback(async (category: {label?: string, value?: string}) => {
        if (category.value) {
            const filteredProducts = await getProductsByCategory(category.value);
            setProducts(filteredProducts as Product[]);
        } else {
            loadProducts();
            return;
        }
    }, [getProductsByCategory, loadProducts])

    useFocusEffect(
        useCallback(() => {
            loadProducts();
        }, [loadProducts])
    );

    return { products, filterProductsByCategory };
}