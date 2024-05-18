import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { Product } from '@/types';
import { useDB } from '@hooks/useDB';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';

type NewProductScreenProps = NativeStackScreenProps<
    RootStackParamList,
    'modal'
>;

const NewProductScreen: React.FC<NewProductScreenProps> = ({ navigation }) => {
    const { saveProduct } = useDB();
    const [product, setProduct] = useState<Product>({
        name: 'Hat',
        price: 42,
        quantity: 100,
        image: '',
        description: '',
        category: 'clothing',
    });

    const addProduct = async () => {
        const result = await saveProduct(product);
        console.log(result);
        navigation.goBack();
    };
    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='name'
                    value={product.name}
                    onChangeText={(text) =>
                        setProduct((product) => ({ ...product, name: text }))
                    }
                />
                <TextInput
                    style={styles.input}
                    placeholder='price'
                    value={product.price.toString()}
                    onChangeText={(text) =>
                        setProduct((product) => ({
                            ...product,
                            price: Number(text),
                        }))
                    }
                />
                <TextInput
                    style={styles.input}
                    placeholder='quantity'
                    value={product.quantity.toString()}
                    onChangeText={(text) =>
                        setProduct((product) => ({
                            ...product,
                            quantity: Number(text),
                        }))
                    }
                />
                <TextInput
                    style={styles.input}
                    placeholder='image'
                    value={product.image}
                    onChangeText={(text) =>
                        setProduct((product) => ({ ...product, image: text }))
                    }
                />
                <TextInput
                    style={styles.input}
                    placeholder='description'
                    value={product.description}
                    onChangeText={(text) =>
                        setProduct((product) => ({
                            ...product,
                            description: text,
                        }))
                    }
                />
                <TextInput
                    style={styles.input}
                    placeholder='category'
                    value={product.category}
                    onChangeText={(text) =>
                        setProduct((product) => ({
                            ...product,
                            category: text,
                        }))
                    }
                />
                <Button title='Create Product' onPress={addProduct} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    form: {
        gap: 20,
        marginTop: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 8,
    },
});

export default NewProductScreen;
