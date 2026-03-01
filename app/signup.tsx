import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { VibrantBackground } from '@/components/VibrantBackground';
import { UserType } from '@/models/User';
import { AppDispatch } from '@/redux/store';
import { registerUser } from '@/redux/userSlice/userThunk';
import { useDispatch } from 'react-redux';

const { width } = Dimensions.get('window');
const ACCENT_COLOR = '#22E1FF';

export default function SignUpScreen() {
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
            await dispatch(registerUser(user!)).unwrap();
            Alert.alert('Success', 'Account created successfully!');
            router.replace('/(tabs)');
        } catch (error: any) {
            console.error('Registration error:', error);
            Alert.alert('Error', error || 'Failed to register');
        } finally {
            setLoading(false);
        }
    };

    return (
        <VibrantBackground>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <Animated.View
                    entering={FadeInUp.delay(200).duration(1000)}
                    style={styles.header}
                >
                    <ThemedText style={styles.title}>Create Account</ThemedText>
                    <ThemedText style={styles.subtitle}>Start your journey with us</ThemedText>
                </Animated.View>

                <Animated.View
                    entering={FadeInDown.delay(400).duration(800)}
                    style={styles.formContainer}
                >
                    <View style={styles.formGroup}>
                        <ThemedText style={styles.label}>FULL NAME</ThemedText>
                        <TextInput
                            placeholder="Jiara Martins"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            style={styles.input}
                            value={user?.name as string}
                            onChangeText={(text) => setUser(prev => ({ ...prev, name: text } as UserType))}
                        />
                    </View>

                    <View style={styles.formGroup}>
                        <ThemedText style={styles.label}>EMAIL ADDRESS</ThemedText>
                        <TextInput
                            placeholder="mail@example.com"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            style={styles.input}
                            value={user?.email as string}
                            onChangeText={(text) => setUser(prev => ({ ...prev, email: text } as UserType))}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.formGroup}><ThemedText style={styles.label}>PASSWORD</ThemedText>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="••••••••"
                                placeholderTextColor="rgba(255,255,255,0.4)"
                                secureTextEntry={!isPasswordVisible}
                                style={styles.flexInput}
                                value={user?.password as string}
                                onChangeText={(text) => setUser(prev => ({ ...prev, password: text } as UserType))}
                            />
                            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeIcon}>
                                <Ionicons name={isPasswordVisible ? "eye-outline" : "eye-off-outline"} size={22} color={ACCENT_COLOR} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.formGroup}>
                        <ThemedText style={styles.label}>CONFIRM PASSWORD</ThemedText>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="••••••••"
                                placeholderTextColor="rgba(255,255,255,0.4)"
                                secureTextEntry={!isConfirmPasswordVisible}
                                style={styles.flexInput}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                            <TouchableOpacity onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)} style={styles.eyeIcon}>
                                <Ionicons name={isConfirmPasswordVisible ? "eye-outline" : "eye-off-outline"} size={22} color={ACCENT_COLOR} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.formGroup}>
                        <ThemedText style={styles.label}>DATE OF BIRTH</ThemedText>
                        <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
                            <View style={styles.datePickerContent}>
                                <ThemedText style={styles.dateText}>{user?.dob as string || 'Select Date'}</ThemedText>
                                <Ionicons name="calendar-outline" size={20} color={ACCENT_COLOR} />
                            </View>
                        </TouchableOpacity>
                        {showPicker && (
                            <DateTimePicker
                                value={date} mode="date"
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                onChange={onDateChange} maximumDate={new Date()}
                            />
                        )}
                    </View>

                    <TouchableOpacity style={styles.signUpButton} onPress={handleRegister} disabled={loading}>
                        {loading ? <ActivityIndicator color="#000" /> : <ThemedText style={styles.signUpButtonText}>Create Account</ThemedText>}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginButton} onPress={() => router.back()}>
                        <ThemedText style={styles.loginText}>Already have an account? <ThemedText style={styles.loginTextBold}>Sign In</ThemedText></ThemedText>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        </VibrantBackground>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 35,
        paddingTop: 80,
        paddingBottom: 40,
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
    formContainer: {
        width: '100%',
    },
    formGroup: {
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
        justifyContent: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        height: 55,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    flexInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 20,
        color: '#FFFFFF',
        fontSize: 16,
    },
    eyeIcon: {
        paddingRight: 15,
    },
    datePickerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    signUpButton: {
        backgroundColor: '#FFFFFF',
        height: 55,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: ACCENT_COLOR,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    signUpButtonText: {
        color: '#000000',
        fontSize: 17,
        fontWeight: 'bold',
    },
    loginButton: {
        marginTop: 25,
        alignItems: 'center',
    },
    loginText: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.6)',
    },
    loginTextBold: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});
