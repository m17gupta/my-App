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

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { loginUser } from '@/redux/userSlice/userThunk';

const { width } = Dimensions.get('window');

const ORANGE_COLOR = '#F8B65A';
const LIGHT_GREY = '#DEDEDE';

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
           const response = await dispatch(loginUser({ email, password })).unwrap();

            const data = await response.json();
            console.log("Login Data", data);
            if (data.success) {
                router.push('/(tabs)');
            } else {
                Alert.alert('Error', data.error || 'Failed to login');
            }
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Error', 'Something went wrong. Please check your network connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Stack.Screen options={{ headerShown: false }} />
            <ThemedView style={styles.container}>

                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <Image
                        source={require('@/assets/images/ChatGPT Image Mar 1, 2026, 11_59_19 AM.png')}
                        style={styles.logoImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Login Header */}
                <View style={styles.header}>
                    <ThemedText style={styles.title}>Login</ThemedText>
                </View>

                {/* Form Section */}
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <ThemedText style={styles.label}>NAME</ThemedText>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Jiara Martins"
                            placeholderTextColor="#8E8E93"
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
                            placeholderTextColor="#8E8E93"
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
                </View>

                {/* Footer Shape */}
                <View style={styles.footerShapeContainer}>
                    <View style={styles.footerTrapezoid} />
                </View>

            </ThemedView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0a1024',
    },
    container: {
        flex: 1,
        paddingHorizontal: 40,
        backgroundColor: '#0a1024',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoImage: {
        width: 180,
        height: 180,
    },
    header: {
        marginBottom: 30,
        alignItems: 'center',
    },
    title: {
        fontSize: 44,
        fontWeight: '900',
        color: '#FFFFFF',
    },
    form: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#AAA',
        marginBottom: 8,
        marginLeft: 5,
    },
    input: {
        width: '100%',
        height: 55,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 15,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#FFFFFF',
    },
    loginButton: {
        backgroundColor: ORANGE_COLOR,
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    loginButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signupButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    signupText: {
        fontSize: 14,
        color: '#8E8E93',
    },
    signupTextBold: {
        color: ORANGE_COLOR,
        fontWeight: 'bold',
    },
    footerShapeContainer: {
        position: 'absolute',
        bottom: -50,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
    footerTrapezoid: {
        width: width * 1.2,
        height: 150,
        backgroundColor: ORANGE_COLOR,
        transform: [{ perspective: 100 }, { rotateX: '45deg' }],
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
});
