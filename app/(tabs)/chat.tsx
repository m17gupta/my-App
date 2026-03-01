import { AllUser } from '@/components/AllUser';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ChatScreen() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <AllUser />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
