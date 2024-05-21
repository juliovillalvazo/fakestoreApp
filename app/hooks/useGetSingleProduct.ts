import { useEffect, useState } from "react";
import { useDB } from "./useDB"
import { Product } from "@/types";

export const useGetSingleProduct = (id: string ) => {
    const {getProductById} = useDB();
    const [product, setProduct] = useState<Product | undefined>();

    const getProduct = async () => {
        const result = await getProductById(id);
        setProduct(result[0] as Product | undefined);
    }

    useEffect(() => {
        getProduct();
    }, [id]);

    return { product };
}