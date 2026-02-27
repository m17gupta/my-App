import { Stack } from 'expo-router';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function LoginScreen() {
    const colorScheme = useColorScheme() ?? 'light';

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.content}>
                <ThemedText type="title" style={styles.title}>
                    Instamobile
                </ThemedText>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#999"
                        style={[
                            styles.input,
                            {
                                color: Colors[colorScheme].text,
                                borderColor: colorScheme === 'dark' ? '#444' : '#eee',
                                backgroundColor: colorScheme === 'dark' ? '#222' : '#f9f9f9',
                            }
                        ]}
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor="#999"
                        secureTextEntry
                        style={[
                            styles.input,
                            {
                                color: Colors[colorScheme].text,
                                borderColor: colorScheme === 'dark' ? '#444' : '#eee',
                                backgroundColor: colorScheme === 'dark' ? '#222' : '#f9f9f9',
                            }
                        ]}
                    />
                </View>

                <TouchableOpacity style={styles.loginButton} activeOpacity={0.8}>
                    <ThemedText style={styles.loginButtonText}>Login</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.facebookButton}>
                    <ThemedText style={styles.facebookButtonText}>Login With Facebook</ThemedText>
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: '900',
        marginBottom: 40,
    },
    inputContainer: {
        width: '100%',
        gap: 12,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    loginButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#3897f1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 10,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    facebookButton: {
        marginTop: 20,
    },
    facebookButtonText: {
        color: '#3897f1',
        fontSize: 15,
        fontWeight: '600',
    },
});
