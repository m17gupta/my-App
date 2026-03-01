import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Dimensions,
    Image,
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { VibrantBackground } from '@/components/VibrantBackground';
import { AppDispatch } from '@/redux/store';
import { loginUser } from '@/redux/userSlice/userThunk';
import { useDispatch } from 'react-redux';

const { width } = Dimensions.get('window');

const ACCENT_COLOR = '#22E1FF'; // Vibrant Blue
const SECONDARY_ACCENT = '#FF7E5F'; // Vibrant Pink/Orange

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }
        setLoading(true);
        try {
            await dispatch(loginUser({ email, password })).unwrap();
            router.push('/(tabs)');
        } catch (error: any) {
            console.error('Login error:', error);
            Alert.alert('Error', error || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <VibrantBackground>
            <SafeAreaView style={styles.safeArea}>
                <Stack.Screen options={{ headerShown: false }} />
                <View style={styles.container}>

                    {/* Logo Section */}
                    <Animated.View
                        entering={FadeInUp.delay(200).duration(1000)}
                        style={styles.logoContainer}
                    >
                        <Image
                            source={require('@/assets/images/ChatGPT Image Mar 1, 2026, 11_59_19 AM.png')}
                            style={styles.logoImage}
                            resizeMode="contain"
                        />
                    </Animated.View>

                    {/* Login Header */}
                    <Animated.View
                        entering={FadeInDown.delay(400).duration(800)}
                        style={styles.header}
                    >
                        <ThemedText style={styles.title}>Welcome</ThemedText>
                        <ThemedText style={styles.subtitle}>Sign in to continue</ThemedText>
                    </Animated.View>

                    {/* Form Section */}
                    <Animated.View
                        entering={FadeInDown.delay(600).duration(800)}
                        style={styles.form}
                    >
                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.label}>EMAIL</ThemedText>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                placeholder="mail@example.com"
                                placeholderTextColor="rgba(255,255,255,0.4)"
                                autoCapitalize="none"
                                style={styles.input}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <ThemedText style={styles.label}>PASSWORD</ThemedText>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                placeholder="••••••••"
                                placeholderTextColor="rgba(255,255,255,0.4)"
                                secureTextEntry={true}
                                style={styles.input}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            <ThemedText style={styles.loginButtonText}>
                                {loading ? 'Logging in...' : 'Log in'}
                            </ThemedText>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.signupButton}
                            onPress={() => router.push('/signup')}
                        >
                            <ThemedText style={styles.signupText}>
                                Don't have an account? <ThemedText style={styles.signupTextBold}>Sign Up</ThemedText>
                            </ThemedText>
                        </TouchableOpacity>
                    </Animated.View>

                </View>
            </SafeAreaView>
        </VibrantBackground>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 35,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logoImage: {
        width: 140,
        height: 140,
    },
    header: {
        marginBottom: 40,
        alignItems: 'center',
    },
    title: {
        fontSize: 38,
        fontWeight: '900',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.6)',
        marginTop: 5,
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 11,
        fontWeight: 'bold',
        color: ACCENT_COLOR,
        marginBottom: 10,
        letterSpacing: 1,
    },
    input: {
        width: '100%',
        height: 55,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    loginButton: {
        backgroundColor: '#FFFFFF',
        height: 55,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        shadowColor: ACCENT_COLOR,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    loginButtonText: {
        color: '#000000',
        fontSize: 17,
        fontWeight: 'bold',
    },
    signupButton: {
        marginTop: 25,
        alignItems: 'center',
    },
    signupText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.6)',
    },
    signupTextBold: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});
