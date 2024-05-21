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

    const deleteProduct = useCallback((id: string) => {
        const sql = `DELETE FROM products WHERE id = ?;`;
        const args = [id];

        return db.runAsync(sql, args);
    }, []);

    const updateProduct = useCallback((product: Product) => {
        const sql = `UPDATE products SET name = ?, price = ?, quantity = ?, image = ?, description = ?, category = ? WHERE id = ?;`;
        const args = [product.name, product.price, product.quantity, product.image, product.description, product.category, product.id] as SQLite.SQLiteBindParams;
        
        return db.runAsync(sql, args);
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

    const getProductById = useCallback((id: string) => {
        const sql = `SELECT * FROM products WHERE id = ?;`;

        const args =[id];
        return db.getAllAsync(sql, args);
    }, []);

    useEffect(() => {
        initDB();
    }, [])

    return { getProducts, saveProduct, getAllCategories, getProductsByCategory, getProductById, deleteProduct, updateProduct };
}