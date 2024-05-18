import { View, Text } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/App';

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'details'>;

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
    return (
        <View>
            <Text>DetailsScreen</Text>
        </View>
    );
};
