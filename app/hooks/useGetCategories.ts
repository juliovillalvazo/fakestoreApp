import { useCallback, useState } from "react";
import { useDB } from "./useDB";
import { useFocusEffect } from "@react-navigation/native";

export const useGetCategories = () => {
    const [categories, setCategories] = useState<{label: string, value?: string}[]>([]);
    const { getAllCategories } = useDB();


    const loadCategories = useCallback(async () => {
        const categories = await getAllCategories();
        const formattedCategories = (categories as { category: string }[]).map((c) => ({label: c.category, value: c.category}));
        setCategories([{label: "All", value: undefined}, ...formattedCategories]);
    }, [getAllCategories])

    useFocusEffect(
        useCallback(() => {
            loadCategories();
        }, [loadCategories])
    );

    return { categories };
}