import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Alert, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { handleBiometricAuth } from '@/utils/biometrics';
import { useState } from 'react';

export default function LoginScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const onBiometricAuth = async () => {
        const success = await handleBiometricAuth();
        if (success) {
            Alert.alert('Success', 'Authenticated successfully!');
            router.replace('/(tabs)');
        }
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data);
            if (response.status === 200) {
                // move to home screen
                router.push('/(tabs)');
            } else {
                Alert.alert('Error', data.error || 'Failed to create account');
            }
        } catch (error) {
            console.error('Registration error:', error);
            Alert.alert('Error', 'Something went wrong. Please check your network connection.');
        } finally {
            setLoading(false);
        }

    };

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.content}>
                <ThemedText type="title" style={styles.title}>
                    Instamobile
                </ThemedText>

                <View style={styles.inputContainer}>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
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
                    <View style={[
                        styles.passwordContainer,
                        {
                            borderColor: colorScheme === 'dark' ? '#444' : '#eee',
                            backgroundColor: colorScheme === 'dark' ? '#222' : '#f9f9f9',
                        }
                    ]}>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Password"
                            placeholderTextColor="#999"
                            secureTextEntry={!isPasswordVisible}
                            style={[
                                styles.flexInput,
                                { color: Colors[colorScheme].text }
                            ]}
                        />
                        <TouchableOpacity
                            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons
                                name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                                size={22}
                                color={colorScheme === 'dark' ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.loginButton} activeOpacity={0.8}
                    onPress={handleLogin}>
                    <ThemedText style={styles.loginButtonText}>Login</ThemedText>
                </TouchableOpacity>

                <View style={styles.biometricContainer}>
                    <TouchableOpacity onPress={onBiometricAuth} style={styles.biometricButton}>
                        <Ionicons
                            name="finger-print-outline"
                            size={40}
                            color={colorScheme === 'dark' ? '#fff' : '#333'}
                        />
                        <ThemedText style={styles.biometricText}>Login with Biometrics</ThemedText>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.facebookButton}
                    onPress={() => router.push('/signup')}
                >
                    <ThemedText style={styles.facebookButtonText}>Sign Up</ThemedText>
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
    passwordContainer: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 15,
        fontSize: 16,
    },
    eyeIcon: {
        paddingRight: 15,
        height: '100%',
        justifyContent: 'center',
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
    biometricContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    biometricButton: {
        alignItems: 'center',
        gap: 8,
    },
    biometricText: {
        fontSize: 14,
        opacity: 0.7,
    },
    facebookButton: {
        marginTop: 40,
    },
    facebookButtonText: {
        color: '#3897f1',
        fontSize: 15,
        fontWeight: '600',
    },
});
