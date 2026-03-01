import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { PasswordType } from './PassWordType';

interface AddPasswordModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (newEntry: PasswordType) => void;
}

const ICON_OPTIONS = [
    'key-variant', 'google', 'facebook', 'apple', 'amazon',
    'microsoft-outlook', 'credit-card', 'bank', 'wallet', 'shield-lock',
    'lock', 'email', 'cellphone', 'laptop', 'github', 'aws', 'instagram', 'twitter', 'netflix', 'spotify'
];

const ACCENT_COLOR = '#22E1FF';

const AddPasswordModal = ({ visible, onClose, onSave }: AddPasswordModalProps) => {
    const [form, setForm] = useState<Partial<PasswordType>>({
        title: '',
        user: '',
        password: '',
        icon: 'key-variant',
        type: 'login'
    });

    const handleSave = () => {
        if (!form.title || !form.user || !form.password) {
            alert('Please fill all fields');
            return;
        }

        const newEntry: PasswordType = {
            id: Date.now().toString(),
            title: form.title!,
            user: form.user!,
            password: form.password!,
            icon: form.icon || 'key-variant',
            type: form.type || 'login',
            createdAt: new Date(),
            updatedAt: new Date(),
            isShowPassword: false
        };

        onSave(newEntry);
        setForm({ title: '', user: '', password: '', icon: 'key-variant', type: 'login' });
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <Animated.View
                    entering={SlideInDown.duration(600)}
                    style={styles.modalContent}
                >
                    <BlurView intensity={90} tint="dark" style={StyleSheet.absoluteFill}>
                        <View style={styles.contentPadding}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>New Credential</Text>
                                <TouchableOpacity onPress={onClose}>
                                    <Icon name="close" size={24} color="#FFF" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
                                <View style={styles.inputGroup}>
                                    <Text style={styles.modalLabel}>SERVICE TITLE</Text>
                                    <TextInput
                                        style={styles.modalInput}
                                        placeholder="Netflix, GitHub, Gmail..."
                                        placeholderTextColor="rgba(255,255,255,0.3)"
                                        value={form.title}
                                        onChangeText={(text) => setForm({ ...form, title: text })}
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.modalLabel}>USER ID / EMAIL</Text>
                                    <TextInput
                                        style={styles.modalInput}
                                        placeholder="mail@example.com"
                                        placeholderTextColor="rgba(255,255,255,0.3)"
                                        value={form.user}
                                        onChangeText={(text) => setForm({ ...form, user: text })}
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.modalLabel}>PASSWORD</Text>
                                    <TextInput
                                        style={styles.modalInput}
                                        placeholder="••••••••••••"
                                        placeholderTextColor="rgba(255,255,255,0.3)"
                                        secureTextEntry
                                        value={form.password}
                                        onChangeText={(text) => setForm({ ...form, password: text })}
                                    />
                                </View>

                                <View style={styles.inputGroup}>
                                    <Text style={styles.modalLabel}>SERVICE ICON</Text>
                                    <View style={styles.iconPicker}>
                                        {ICON_OPTIONS.map((iconName) => (
                                            <TouchableOpacity
                                                key={iconName}
                                                style={[
                                                    styles.iconOption,
                                                    form.icon === iconName && styles.iconOptionSelected
                                                ]}
                                                onPress={() => setForm({ ...form, icon: iconName })}
                                            >
                                                <Icon
                                                    name={iconName as any}
                                                    size={22}
                                                    color={form.icon === iconName ? "#000" : "rgba(255,255,255,0.6)"}
                                                />
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>

                                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                                    <Text style={styles.saveBtnText}>Secure in Vault</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </BlurView>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'transparent',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        maxHeight: '85%',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    contentPadding: {
        padding: 25,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: '#FFF',
    },
    modalBody: {
        marginBottom: 30,
    },
    inputGroup: {
        marginBottom: 20,
    },
    modalLabel: {
        fontSize: 11,
        fontWeight: 'bold',
        color: ACCENT_COLOR,
        marginBottom: 10,
        letterSpacing: 1,
    },
    modalInput: {
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 15,
        padding: 15,
        color: '#FFF',
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    iconPicker: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: 15,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    iconOption: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    iconOptionSelected: {
        backgroundColor: '#FFF',
    },
    saveBtn: {
        backgroundColor: '#FFF',
        borderRadius: 18,
        padding: 20,
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 40,
        shadowColor: ACCENT_COLOR,
        shadowOpacity: 0.2,
        elevation: 10,
    },
    saveBtnText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddPasswordModal;
