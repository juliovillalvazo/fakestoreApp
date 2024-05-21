import { View, StyleSheet, TextInput, Button } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';
import { useUpdateProduct } from '../hooks/useUpdateProduct';

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'details'>;

export const DetailsScreen: React.FC<DetailsScreenProps> = ({
    navigation,
    route,
}) => {
    const { id } = route.params;
    const { updatedProduct, setUpdatedProduct, handleUpdate } =
        useUpdateProduct(id);

    const onUpdate = () => {
        handleUpdate();
        navigation.goBack();
    };

    if (!updatedProduct) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='name'
                    value={updatedProduct.name}
                    onChangeText={(text) =>
                        setUpdatedProduct((product) => ({
                            ...product!,
                            name: text,
                        }))
                    }
                />
                <TextInput
                    style={styles.input}
                    placeholder='price'
                    value={updatedProduct.price.toString()}
                    onChangeText={(text) =>
                        setUpdatedProduct((product) => ({
                            ...product!,
                            price: Number(text),
                        }))
                    }
                />
                <TextInput
                    style={styles.input}
                    placeholder='quantity'
                    value={updatedProduct.quantity.toString()}
                    onChangeText={(text) =>
                        setUpdatedProduct((product) => ({
                            ...product!,
                            quantity: Number(text),
                        }))
                    }
                />
                <TextInput
                    style={styles.input}
                    placeholder='image'
                    value={updatedProduct.image}
                    onChangeText={(text) =>
                        setUpdatedProduct((product) => ({
                            ...product!,
                            image: text,
                        }))
                    }
                />
                <TextInput
                    style={styles.input}
                    placeholder='description'
                    value={updatedProduct.description}
                    onChangeText={(text) =>
                        setUpdatedProduct((product) => ({
                            ...product!,
                            description: text,
                        }))
                    }
                />
                <TextInput
                    style={styles.input}
                    placeholder='category'
                    value={updatedProduct.category}
                    onChangeText={(text) =>
                        setUpdatedProduct((product) => ({
                            ...product!,
                            category: text,
                        }))
                    }
                />
                <Button title='Update Product' onPress={onUpdate} />
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
