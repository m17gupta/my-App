import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');
const NAVY_BLUE = '#345891';
const BACKGROUND_COLOR = '#F8F9FB';

export interface UserMessage {
    id: string;
    name: string;
    message: string;
    time: string;
    unreadCount?: number;
    avatar: string;
}

const MOCK_USERS: UserMessage[] = [
    { id: '1', name: 'Claudia Alves', message: 'Do more of what you love.', time: '3m ago', unreadCount: 3, avatar: 'https://i.pravatar.cc/150?u=claudia' },
    { id: '2', name: 'Dani Martinez', message: 'Do your own thing.', time: '5m ago', unreadCount: 1, avatar: 'https://i.pravatar.cc/150?u=dani' },
    { id: '3', name: 'Kimberly Nguyen', message: 'Kindness is beautiful.', time: '1h ago', unreadCount: 2, avatar: 'https://i.pravatar.cc/150?u=kimberly' },
    { id: '4', name: 'Mariana Napolitani', message: 'Live your purpose.', time: '2h ago', unreadCount: 1, avatar: 'https://i.pravatar.cc/150?u=mariana' },
    { id: '5', name: 'Olivia Wilson', message: 'You got this.', time: '5h ago', avatar: 'https://i.pravatar.cc/150?u=olivia' },
    { id: '6', name: 'Rachelle Beaudry', message: "You're wonderful.", time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?u=rachelle' },
    { id: '7', name: 'Soo Jin Ae', message: 'Keep it simple.', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?u=soojin' },
];

export const AllUser = () => {
    const renderItem = ({ item }: { item: UserMessage }) => (
        <TouchableOpacity style={styles.card} activeOpacity={0.7}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                    <Text style={styles.userName}>{item.name}</Text>
                    {item.unreadCount ? (
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{item.unreadCount}</Text>
                        </View>
                    ) : null}
                </View>
                <View style={styles.cardFooter}>
                    <Text style={styles.messageText} numberOfLines={1}>{item.message}</Text>
                    <Text style={styles.timeText}>{item.time}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Top Curved Decoration */}
            <View style={styles.topCurveContainer}>
                <View style={styles.blueCurve} />
                <TouchableOpacity style={styles.iconButton}>
                    <MaterialCommunityIcons name="brain" size={24} color="#FFF" />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Messages & Chat</Text>
                    <View style={styles.headerLine} />
                </View>
            </View>

            {/* List Header Controls */}
            <View style={styles.listHeader}>
                <TouchableOpacity>
                    <Text style={styles.controlText}>Mark all read</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sortButton}>
                    <Text style={styles.controlText}>Sort by time</Text>
                    <Ionicons name="chevron-down" size={14} color={NAVY_BLUE} />
                </TouchableOpacity>
            </View>

            {/* User List */}
            <FlatList
                data={MOCK_USERS}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listPadding}
                showsVerticalScrollIndicator={false}
            />

            {/* Background Graphic Decor */}
            <View style={styles.bottomGraphic}>
                <Text style={styles.graphicText}>1</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
    },
    topCurveContainer: {
        height: 160,
        width: '100%',
        position: 'relative',
        paddingTop: 40,
    },
    blueCurve: {
        position: 'absolute',
        top: -120,
        left: -60,
        width: 300,
        height: 300,
        backgroundColor: NAVY_BLUE,
        borderRadius: 150,
    },
    iconButton: {
        position: 'absolute',
        top: 50,
        left: 25,
        width: 50,
        height: 50,
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    headerTitleContainer: {
        position: 'absolute',
        top: 70,
        right: 25,
        alignItems: 'flex-end',
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: '300',
        color: '#333',
    },
    headerLine: {
        width: 150,
        height: 2,
        backgroundColor: '#D1D9E6',
        marginTop: 15,
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        marginBottom: 15,
    },
    controlText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    listPadding: {
        paddingHorizontal: 20,
        paddingBottom: 100,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#EEE',
    },
    cardContent: {
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
        fontSize: 17,
        fontWeight: '700',
        color: '#333',
    },
    badge: {
        backgroundColor: NAVY_BLUE,
        width: 22,
        height: 22,
        borderRadius: 11,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#FFF',
        fontSize: 11,
        fontWeight: 'bold',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    messageText: {
        fontSize: 14,
        color: '#888',
        flex: 1,
        marginRight: 10,
    },
    timeText: {
        fontSize: 12,
        color: '#BBB',
    },
    bottomGraphic: {
        position: 'absolute',
        bottom: -50,
        right: -30,
        width: 200,
        height: 250,
        backgroundColor: NAVY_BLUE,
        opacity: 0.8,
        borderRadius: 40,
        transform: [{ rotate: '45deg' }],
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,
    },
    graphicText: {
        color: 'rgba(255,255,255,0.1)',
        fontSize: 150,
        fontWeight: '900',
        position: 'absolute',
        top: 20,
        left: 20,
    }
});
