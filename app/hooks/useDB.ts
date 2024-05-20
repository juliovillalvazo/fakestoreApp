import { Product } from '@/types';
import * as SQLite from 'expo-sqlite';
import { useCallback, useEffect } from 'react';

const db = SQLite.openDatabaseSync("shop.db");

const initDB = () => {
    const sql = `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        image TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL
    );`;
    db.execAsync(sql).then(() => console.log('db initialized'));
};

export const useDB = () => {
    const getProducts = useCallback(() => {
        const sql = `SELECT * FROM products;`;
        return db.getAllAsync(sql);
    }, []);

    const saveProduct = useCallback((product: Product) => {
        const sql = `INSERT INTO products (name, price, quantity, image, description, category) VALUES ("${product.name}", ${product.price}, ${product.quantity}, "${product.image}", "${product.description}", "${product.category}");`;

        return db.execAsync(sql);
    }, []);

    const getAllCategories = useCallback(() => {
        const sql = `SELECT DISTINCT category FROM products;`;
        return db.getAllAsync(sql);
    }, []);

    const getProductsByCategory = useCallback((category: string) => {
        const sql = `SELECT * FROM products WHERE category = ?;`;
        const args = [category];

        return db.getAllAsync(sql, args);
    }, []);

    useEffect(() => {
        initDB();
    }, [])

    return { getProducts, saveProduct, getAllCategories, getProductsByCategory };
}