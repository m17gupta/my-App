import ListPasword from '@/components/listPassword/ListPasword';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function DocumentsScreen() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <ListPasword />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
