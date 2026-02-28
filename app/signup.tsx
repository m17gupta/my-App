import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { UserType } from '@/models/User';
import { registerUser } from '@/redux/userSlice/userThunk';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

export default function SignUpScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
    const [user, setUser] = useState<UserType | null>({
        name: '',
        email: '',
        password: '',
        dob: '1990-01-01',
        role: 'user',
    } as UserType);
    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [date, setDate] = useState(new Date(1990, 0, 1));
    const [showPicker, setShowPicker] = useState(false);

    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);

        // Format date to YYYY-MM-DD
        const formattedDate = currentDate.toISOString().split('T')[0];
        setUser(prev => ({ ...prev, dob: formattedDate } as UserType));
    };
    const handleRegister = async () => {
        if (!user?.name || !user?.email || !user?.password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        if (user?.password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const response = await dispatch(registerUser(user!)).unwrap();
            if(response){
                Alert.alert('Success', 'Account created successfully!');
               // move tabs
               router.replace('/(tabs)');
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

            {/* Background with Overlay */}
            <View style={StyleSheet.absoluteFill}>
                <View style={[StyleSheet.absoluteFill, { backgroundColor: '#0a1024' }]} />
                <LinearGradient
                    colors={['rgba(10, 16, 36, 0.8)', 'rgba(10, 16, 36, 0.95)']}
                    style={StyleSheet.absoluteFill}
                />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={[styles.mainLayout, isMobile && styles.mobileLayout]}>

                    {/* Left Section */}
                    <View style={styles.leftSection}>
                        <View style={styles.logoContainer}>
                            <View style={styles.logoIcon}>
                                <View style={styles.logoInner} />
                            </View>
                            <ThemedText style={styles.logoText}>Manish gupta </ThemedText>
                        </View>

                        <ThemedText type="title" style={styles.heroTitle}>
                            Join Us{'\n'}Today
                        </ThemedText>

                        <TouchableOpacity onPress={() => router.back()}>
                            <ThemedText style={styles.loginLink}>
                                Already have an account? <ThemedText style={styles.loginLinkBold}>Login</ThemedText>
                            </ThemedText>
                        </TouchableOpacity>

                        <View style={styles.divider} />

                        <ThemedText style={styles.description}>
                            Join our community and explore endless possibilities.
                            Start your journey with Fauget today.
                        </ThemedText>
                    </View>

                    {/* Right Section / Form Card */}
                    <View style={styles.rightSection}>
                        <BlurView intensity={20} tint="light" style={styles.glassCard}>
                            <ThemedText style={styles.formTitle}>Sign Up</ThemedText>

                            <View style={styles.formGroup}>
                                <ThemedText style={styles.label}>FULL NAME</ThemedText>
                                <TextInput
                                    placeholder="Enter your name"
                                    placeholderTextColor="rgba(255,255,255,0.4)"
                                    style={styles.input}
                                    value={user?.name as string}
                                    onChangeText={(text) => setUser(prev => ({ ...prev, name: text } as UserType))}
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <ThemedText style={styles.label}>EMAIL</ThemedText>
                                <TextInput
                                    placeholder="hello@example.com"
                                    placeholderTextColor="rgba(255,255,255,0.4)"
                                    style={styles.input}
                                    value={user?.email as string}
                                    onChangeText={(text) => setUser(prev => ({ ...prev, email: text } as UserType))}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>

                            <View style={styles.formGroup}>
                                <ThemedText style={styles.label}>PASSWORD</ThemedText>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        placeholder="••••••••••••"
                                        placeholderTextColor="rgba(255,255,255,0.4)"
                                        secureTextEntry={!isPasswordVisible}
                                        style={styles.flexInput}
                                        value={user?.password as string}
                                        onChangeText={(text) => setUser(prev => ({ ...prev, password: text } as UserType))}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                        style={styles.eyeIcon}
                                    >
                                        <Ionicons
                                            name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                                            size={22}
                                            color="rgba(255,255,255,0.6)"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.formGroup}>
                                <ThemedText style={styles.label}>CONFIRM PASSWORD</ThemedText>
                                <View style={[
                                    styles.inputContainer,
                                    confirmPassword !== '' && user?.password !== confirmPassword && styles.inputError
                                ]}>
                                    <TextInput
                                        placeholder="••••••••••••"
                                        placeholderTextColor="rgba(255,255,255,0.4)"
                                        secureTextEntry={!isConfirmPasswordVisible}
                                        style={styles.flexInput}
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                        style={styles.eyeIcon}
                                    >
                                        <Ionicons
                                            name={isConfirmPasswordVisible ? "eye-outline" : "eye-off-outline"}
                                            size={22}
                                            color="rgba(255,255,255,0.6)"
                                        />
                                    </TouchableOpacity>
                                </View>
                                {confirmPassword !== '' && user?.password !== confirmPassword && (
                                    <ThemedText style={styles.errorText}>Passwords do not match</ThemedText>
                                )}
                            </View>

                            <View style={styles.formGroup}>
                                <ThemedText style={styles.label}>DATE OF BIRTH</ThemedText>
                                <TouchableOpacity
                                    style={styles.input}
                                    onPress={() => setShowPicker(true)}
                                >
                                    <View style={styles.datePickerContent}>
                                        <ThemedText style={styles.dateText}>
                                            {user?.dob as string || 'Select Date'}
                                        </ThemedText>
                                        <ThemedText style={styles.chevron}>∨</ThemedText>
                                    </View>
                                </TouchableOpacity>

                                {showPicker && (
                                    <DateTimePicker
                                        value={date}
                                        mode="date"
                                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                        onChange={onDateChange}
                                        maximumDate={new Date()}
                                    />
                                )}
                            </View>

                            <TouchableOpacity
                                style={[styles.signUpButton, loading && { opacity: 0.7 }]}
                                onPress={handleRegister}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <ThemedText style={styles.signUpText}>Register</ThemedText>
                                )}
                            </TouchableOpacity>
                        </BlurView>
                    </View>
                </View>
            </ScrollView >
        </ThemedView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 40,
        justifyContent: 'center',
    },
    mainLayout: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 60,
    },
    mobileLayout: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 40,
        padding: 0,
    },
    leftSection: {
        flex: 1,
        maxWidth: 500,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 60,
        gap: 12,
    },
    logoIcon: {
        width: 32,
        height: 32,
        backgroundColor: '#f6754a',
        borderRadius: 4,
        transform: [{ skewX: '-15deg' }],
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoInner: {
        width: 16,
        height: 8,
        borderLeftWidth: 3,
        borderBottomWidth: 3,
        borderColor: '#0a1024',
        transform: [{ skewX: '15deg' }],
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    heroTitle: {
        fontSize: 56,
        lineHeight: 64,
        fontWeight: '900',
        color: '#fff',
        marginBottom: 16,
    },
    loginLink: {
        fontSize: 18,
        color: '#fff',
        opacity: 0.9,
        marginBottom: 40,
    },
    loginLinkBold: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    divider: {
        width: 60,
        height: 4,
        backgroundColor: '#fff',
        marginBottom: 40,
    },
    description: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.7,
        lineHeight: 24,
        marginBottom: 60,
    },
    rightSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    glassCard: {
        width: '100%',
        maxWidth: 450,
        paddingHorizontal: 40,
        paddingTop: 60,
        paddingBottom: 40,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        backgroundColor: 'rgba(255,255,255,0.05)',
        overflow: 'hidden',
    },
    formTitle: {
        fontSize: 35,
        fontWeight: '900',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 40,
        lineHeight: 45,
    },
    formGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
        opacity: 0.8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 27,
        height: 54,
    },
    flexInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 25,
        color: '#fff',
        fontSize: 14,
    },
    eyeIcon: {
        paddingRight: 20,
        height: '100%',
        justifyContent: 'center',
    },
    input: {
        width: '100%',
        height: 54,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 27,
        paddingHorizontal: 25,
        color: '#fff',
        fontSize: 14,
    },
    datePickerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
    },
    dateText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
    },
    chevron: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 18,
    },
    signUpButton: {
        backgroundColor: '#f6754a',
        height: 54,
        borderRadius: 27,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signUpText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    inputError: {
        borderColor: '#ff4444',
        borderWidth: 1.5,
    },
    errorText: {
        color: '#ff4444',
        fontSize: 12,
        marginTop: 6,
        marginLeft: 15,
        fontWeight: '500',
    },
});
