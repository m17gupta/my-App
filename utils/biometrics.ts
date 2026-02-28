import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

export const handleBiometricAuth = async () => {
    try {
        // Check if device supports biometrics
        const isCompatible = await LocalAuthentication.hasHardwareAsync();
        if (!isCompatible) {
            Alert.alert('Not Supported', 'Your device does not support biometric authentication.');
            return false;
        }

        // Check if biometrics are enrolled
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (!isEnrolled) {
            Alert.alert('Not Enrolled', 'No biometrics found. Please set up Fingerprint or Face ID in your device settings.');
            return false;
        }

        // Authenticate
        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Login with Biometrics',
            fallbackLabel: 'Use Password',
            disableDeviceFallback: false,
        });

        if (result.success) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Biometric Auth Error:', error);
        return false;
    }
};
