import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

interface PortfolioCardProps {
    title: string;
    category: string;
    image: string;
    onPress?: () => void;
}

export default function PortfolioCard({ title, category, image, onPress }: PortfolioCardProps) {
    return (
        <Animated.View entering={FadeInUp.duration(600)}>
            <TouchableOpacity activeOpacity={0.9} style={styles.container} onPress={onPress}>
                <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
                <BlurView intensity={40} tint="dark" style={styles.infoContainer}>
                    <View style={styles.textWrap}>
                        <Text style={styles.title} numberOfLines={1}>{title}</Text>
                        <Text style={styles.category}>{category}</Text>
                    </View>
                    <View style={styles.arrowButton}>
                        <Ionicons name="arrow-forward" size={14} color="#000" />
                    </View>
                </BlurView>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        height: 220,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    textWrap: {
        flex: 1,
    },
    title: {
        fontSize: 14,
        fontWeight: '900',
        color: '#FFFFFF',
        marginBottom: 2,
    },
    category: {
        fontSize: 11,
        color: '#22E1FF',
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    arrowButton: {
        width: 28,
        height: 28,
        backgroundColor: '#FFFFFF',
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    }
});
