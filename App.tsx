import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProductsScreen from '@screens/Products/ProductsScreen';
import NewProductScreen from '@screens/Products/NewProductScreen';
import { DetailsScreen } from '@screens/DetailsScreen';
import { Ionicons } from '@expo/vector-icons';

export type RootStackParamList = {
    products: undefined;
    modal: undefined;
    details: { id: string };
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

const StackNavigator = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
    const { navigate } = useNavigation();
    return (
        <StackNavigator.Navigator>
            <StackNavigator.Screen
                name='products'
                component={ProductsScreen}
                options={{
                    headerRight: () => {
                        return (
                            <TouchableOpacity onPress={() => navigate('modal')}>
                                <Ionicons name='add' size={24} />
                            </TouchableOpacity>
                        );
                    },
                    headerTitle: 'Products',
                }}
            />
            <StackNavigator.Screen name='details' component={DetailsScreen} />
            <StackNavigator.Screen
                name='modal'
                component={NewProductScreen}
                options={{
                    presentation: 'modal',
                    headerTitle: 'New Product',
                }}
            />
        </StackNavigator.Navigator>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <RootStackNavigator />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
