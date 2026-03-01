import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { VibrantBackground } from '../VibrantBackground';
import AddPasswordModal from './AddPasswordModal';
import { PasswordType } from './PassWordType';
import ShowPassword from './ShowPassword';

const ACCENT_COLOR = '#22E1FF';

const ListPasword = () => {
    const [search, setSearch] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [passwords, setPasswords] = useState<PasswordType[]>([
        { id: '1', title: 'Google Account', user: 'manish.g@gmail.com', type: 'login', icon: 'google', password: '123456', isShowPassword: true, createdAt: new Date(), updatedAt: new Date() },
        { id: '2', title: 'HDFC Bank Card', user: '**** 4421', type: 'card', icon: 'credit-card', password: '123456', isShowPassword: true, createdAt: new Date(), updatedAt: new Date() },
        { id: '3', title: 'Amazon Web Services', user: 'admin_m', type: 'login', icon: 'aws', password: '123456', isShowPassword: true, createdAt: new Date(), updatedAt: new Date() },
    ]);

    const filteredData = passwords.filter(item =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.user?.toLowerCase().includes(search.toLowerCase())
    );

    const handleSave = (newEntry: PasswordType) => {
        setPasswords([newEntry, ...passwords]);
        setModalVisible(false);
    };

    return (
        <VibrantBackground>
            <View style={styles.container}>
                {/* Header */}
                <Animated.View entering={FadeInUp.duration(600)} style={styles.header}>
                    <Text style={styles.greeting}>Your Passwords</Text>
                    <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
                        <Icon name="plus" size={26} color="#000" />
                    </TouchableOpacity>
                </Animated.View>

                {/* Search bar */}
                <Animated.View entering={FadeInUp.delay(200).duration(600)} style={styles.searchSection}>
                    <Icon name="magnify" size={20} color="rgba(255,255,255,0.4)" />
                    <TextInput
                        style={styles.input}
                        placeholder="Search for a secret..."
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        onChangeText={setSearch}
                    />
                </Animated.View>

                {/* List */}
                {filteredData.length > 0 ? (
                    <FlatList
                        data={filteredData}
                        renderItem={({ item }) => <ShowPassword item={item} />}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ paddingBottom: 120 }}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <Animated.View entering={FadeInDown.duration(800)} style={styles.emptyContainer}>
                        <Icon name="lock-open-variant-outline" size={60} color="rgba(255,255,255,0.1)" />
                        <Text style={styles.emptyText}>Vault is currently empty</Text>
                    </Animated.View>
                )}

                {/* Add Password Modal */}
                <AddPasswordModal
                    visible={isModalVisible}
                    onClose={() => setModalVisible(false)}
                    onSave={handleSave}
                />
            </View>
        </VibrantBackground>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 25 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 50, marginBottom: 30 },
    greeting: { fontSize: 32, fontWeight: '900', color: '#FFF', letterSpacing: -0.5 },
    addBtn: { backgroundColor: '#FFF', padding: 8, borderRadius: 14, shadowColor: '#000', shadowOpacity: 0.1, elevation: 5 },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.08)',
        borderRadius: 18,
        paddingHorizontal: 15,
        marginBottom: 30,
        height: 55,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    input: { flex: 1, color: '#FFF', marginLeft: 10, fontSize: 16 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.5 },
    emptyText: { color: 'rgba(255,255,255,0.5)', fontSize: 17, marginTop: 15, fontWeight: '600' }
});

export default ListPasword;
