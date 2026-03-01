import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { VibrantBackground } from './VibrantBackground';

const { width } = Dimensions.get('window');

const USERS = [
    { id: '1', name: 'Jiara Martins', message: 'That is crazy!', time: '1m', unread: 2, avatar: 'https://i.pravatar.cc/150?u=jiara' },
    { id: '2', name: 'James Thompson', message: 'Ok, see you then.', time: '2m', unread: 0, avatar: 'https://i.pravatar.cc/150?u=james' },
    { id: '3', name: 'Jessica Jung', message: 'I will be there in 5m', time: '15m', unread: 1, avatar: 'https://i.pravatar.cc/150?u=jessica' },
    { id: '4', name: 'Elizabeth Churchill', message: 'What is the plan?', time: '1h', unread: 0, avatar: 'https://i.pravatar.cc/150?u=elizabeth' },
    { id: '5', name: 'Deliya de Silva', message: 'Can you send the doc?', time: '2h', unread: 0, avatar: 'https://i.pravatar.cc/150?u=deliya' },
];

const ACCENT_COLOR = '#22E1FF';

export const AllUser = () => {
    const renderItem = ({ item, index }: { item: any, index: number }) => (
        <Animated.View
            entering={FadeInDown.delay(200 + index * 100).duration(600)}
            style={styles.userCard}
        >
            <View style={styles.avatarContainer}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                {item.unread > 0 && <View style={styles.unreadBadge} />}
            </View>
            <View style={styles.userInfo}>
                <View style={styles.cardHeader}>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.lastMessage} numberOfLines={1}>{item.message}</Text>
            </View>
        </Animated.View>
    );

    return (
        <VibrantBackground>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />

                {/* Header */}
                <Animated.View entering={FadeInUp.duration(800)} style={styles.header}>
                    <View>
                        <Text style={styles.title}>Messages</Text>
                        <Text style={styles.subtitle}>You have {USERS.length} active chats</Text>
                    </View>
                    <TouchableOpacity style={styles.searchBtn}>
                        <Ionicons name="search" size={24} color="#FFF" />
                    </TouchableOpacity>
                </Animated.View>

                {/* Users List */}
                <FlatList
                    data={USERS}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        </VibrantBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingTop: 20,
        marginBottom: 30,
    },
    title: {
        fontSize: 34,
        fontWeight: '900',
        color: '#FFF',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
        marginTop: 2,
    },
    searchBtn: {
        width: 45,
        height: 45,
        borderRadius: 15,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.08)',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 55,
        height: 55,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    unreadBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: ACCENT_COLOR,
        borderWidth: 2,
        borderColor: '#1a0b2e',
    },
    userInfo: {
        flex: 1,
        marginLeft: 15,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
    time: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.4)',
    },
    lastMessage: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.6)',
    },
});
