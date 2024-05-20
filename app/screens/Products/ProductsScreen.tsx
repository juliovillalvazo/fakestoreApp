import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    ListRenderItem,
} from 'react-native';
import { useGetProducts } from '@hooks/useGetProducts';
import { Product } from '@/types';
import { memo, useState } from 'react';
import { useGetCategories } from '@hooks/useGetCategories';
import DropDownPicker from 'react-native-dropdown-picker';

const formatNumber = (number: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(number);
};

const ProductsScreen = () => {
    const { products, filterProductsByCategory } = useGetProducts();
    const { categories } = useGetCategories();
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    if (!products || !products.length) {
        return (
            <View>
                <Text>No products</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <DropDownPicker
                searchable
                onSelectItem={filterProductsByCategory}
                open={open}
                setOpen={setOpen}
                value={selectedCategory}
                setValue={setSelectedCategory}
                items={categories}
                placeholder='Select a category'
            />
            <FlatList
                data={products}
                keyExtractor={(item) => `${item.id}`}
                renderItem={RenderItem}
                ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            />
        </View>
    );
};

const RenderItem: ListRenderItem<Product> = ({ item }) => {
    return <ProductItem product={item} />;
};

const ProductItem = memo(({ product }: { product: Product }) => {
    return (
        <View key={product.id} style={styles.itemContainer}>
            <View style={styles.row}>
                <View style={styles.column}>
                    <Image
                        height={100}
                        width={100}
                        source={{ uri: product.image }}
                        alt={product.name}
                    />
                    <Text>{product.name}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.prices}>
                        Price: {formatNumber(product.price)} x{' '}
                        {product.category}
                    </Text>
                    <Text style={styles.prices}>
                        Quantity: {product.quantity}
                    </Text>
                </View>
            </View>
            <View>
                <Text style={styles.description}>{product.description}</Text>
            </View>
        </View>
    );
});

export default ProductsScreen;

const styles = StyleSheet.create({
    itemContainer: {
        padding: 16,
        borderRadius: 5,
        gap: 16,
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        padding: 16,
        flex: 1,
    },
    column: {
        alignItems: 'flex-start',
        maxWidth: '50%',
        gap: 8,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    description: {
        textAlign: 'justify',
    },
    prices: {
        fontWeight: 'bold',
    },
});
