import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { AppDispatch, RootState } from '@/redux/store';
import { clearError, logout } from '@/redux/userSlice/userSlice';
import { loginUser } from '@/redux/userSlice/userThunk';
import { MaterialCommunityIcons as Icon, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const { width } = Dimensions.get('window');
const isMobile = width < 768;

const AccountScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, loading, error } = useSelector((state: RootState) => state.user);
  const colorScheme = useColorScheme() ?? 'light';

  // State for login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    const result = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(result)) {
      // Login successful
    } else if (loginUser.rejected.match(result)) {
      // Error is already in Redux state, will be displayed inline
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    { icon: 'account-edit-outline', label: 'Edit Profile', onPress: () => { } },
    { icon: 'history', label: 'Order History', onPress: () => { } },
    { icon: 'wallet-outline', label: 'Payment Methods', onPress: () => { } },
    { icon: 'bell-outline', label: 'Notifications', onPress: () => { } },
    { icon: 'shield-check-outline', label: 'Privacy & Security', onPress: () => { } },
    { icon: 'help-circle-outline', label: 'Help & Support', onPress: () => { } },
  ];

  const MenuItem = ({ icon, label, onPress }: { icon: any, label: string, onPress: () => void }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Icon name={icon} size={24} color="#555" />
        <Text style={styles.menuLabel}>{label}</Text>
      </View>
      <Icon name="chevron-right" size={24} color="#CCC" />
    </TouchableOpacity>
  );

  if (!user) {
    // Show Login UI
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

        <ScrollView contentContainerStyle={styles.loginScrollContent}>
          <View style={[styles.mainLayout, isMobile && styles.mobileLayout]}>

            {/* Left Section */}
            <View style={styles.leftSection}>
              <View style={styles.logoContainer}>
                <View style={styles.logoIcon}>
                  <View style={styles.logoInner} />
                </View>
                <ThemedText style={styles.logoText}>Fauget</ThemedText>
              </View>

              <ThemedText type="title" style={styles.heroTitle}>
                Welcome{'\n'}Back!
              </ThemedText>

              <TouchableOpacity onPress={() => router.push('/signup')}>
                <ThemedText style={styles.loginLink}>
                  New here? <ThemedText style={styles.loginLinkBold}>Sign Up</ThemedText>
                </ThemedText>
              </TouchableOpacity>

              <View style={styles.divider} />

              <ThemedText style={styles.description}>
                Experience the best shopping platform.
                Login to access your personalized dashboard and track your orders.
              </ThemedText>
            </View>

            {/* Right Section / Form Card */}
            <View style={styles.rightSection}>
              <BlurView intensity={20} tint="light" style={styles.glassCard}>
                <ThemedText style={styles.formTitle}>Login</ThemedText>

                <View style={styles.formGroup}>
                  <ThemedText style={styles.label}>EMAIL</ThemedText>
                  <TextInput
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (error) dispatch(clearError());
                    }}
                    placeholder="hello@reallygreatsite.com"
                    placeholderTextColor="rgba(255,255,255,0.4)"
                    style={styles.input}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.formGroup}>
                  <ThemedText style={styles.label}>PASSWORD</ThemedText>
                  <View style={styles.passwordContainer}>
                    <TextInput
                      value={password}
                      onChangeText={(text) => {
                        setPassword(text);
                        if (error) dispatch(clearError());
                      }}
                      placeholder="••••••••••••"
                      placeholderTextColor="rgba(255,255,255,0.4)"
                      secureTextEntry={!isPasswordVisible}
                      style={styles.passwordInput}
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

                {error && (
                  <View style={styles.errorContainer}>
                    <Icon name="alert-circle-outline" size={16} color="#FF4444" />
                    <ThemedText style={styles.errorTextInline}>{error}</ThemedText>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <ThemedText style={styles.loginText}>
                    {loading ? 'Logging in...' : 'Login'}
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.secondaryAction}
                  onPress={() => router.push('/signup')}
                >
                  <ThemedText style={styles.secondaryActionText}>
                    Don't have an account? <ThemedText style={styles.secondaryActionTextBold}>Sign Up</ThemedText>
                  </ThemedText>
                </TouchableOpacity>
              </BlurView>
            </View>
          </View>
        </ScrollView>
      </ThemedView>
    );
  }

  // Show Account UI
  return (
    <SafeAreaView style={styles.accountContainer}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.avatar} />
          <Text style={styles.userName}>{user.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{user.role === 'admin' ? 'Admin Member' : 'Premium Member'}</Text>
          </View>
        </View>

        {/* Menu Section */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButtonProfile} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#FF3B30" />
          <Text style={styles.logoutTextProfile}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>App Version 1.0.2</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  accountContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loginScrollContent: {
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
    padding: 40,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  formTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
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
  input: {
    width: '100%',
    height: 54,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 27,
    paddingHorizontal: 25,
    color: '#fff',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#f6754a',
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryAction: {
    marginTop: 20,
    alignItems: 'center',
  },
  secondaryActionText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  secondaryActionTextBold: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  // Account Styles
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#f6754a',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  badge: {
    backgroundColor: '#FFE8E0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 10,
  },
  badgeText: {
    color: '#f6754a',
    fontSize: 12,
    fontWeight: '600',
  },
  menuContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
    fontWeight: '500',
  },
  logoutButtonProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 15,
  },
  logoutTextProfile: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  versionText: {
    textAlign: 'center',
    color: '#AAA',
    fontSize: 12,
    marginVertical: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 27,
    height: 54,
    overflow: 'hidden',
  },
  passwordInput: {
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
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 68, 68, 0.1)',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    gap: 8,
  },
  errorTextInline: {
    color: '#FF4444',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default AccountScreen;

