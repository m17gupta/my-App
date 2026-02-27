import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

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
        <TouchableOpacity activeOpacity={0.9} style={styles.container} onPress={onPress}>
            <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
            <BlurView intensity={30} tint="dark" style={styles.infoContainer}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <Text style={styles.category}>{category}</Text>
                <TouchableOpacity style={styles.arrowButton}>
                    <Ionicons name="arrow-forward" size={12} color="#FFFFFF" />
                </TouchableOpacity>
            </BlurView>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: CARD_WIDTH,
        height: 200,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#1C1C1E',
        marginBottom: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
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
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 2,
    },
    category: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.7)',
        fontWeight: '500',
    },
    arrowButton: {
        position: 'absolute',
        right: 12,
        bottom: 12,
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 4,
        borderRadius: 10,
    }
});
