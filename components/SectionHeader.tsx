import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    light?: boolean;
}

export default function SectionHeader({ title, subtitle, light = false }: SectionHeaderProps) {
    return (
        <View style={styles.container}>
            <Text style={[styles.title, light && styles.lightText]}>{title}</Text>
            {subtitle && <Text style={[styles.subtitle, light && styles.lightText]}>{subtitle}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 30,
        marginBottom: 15,
    },
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: '#FFFFFF',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#8E8E93',
        marginTop: 4,
        fontWeight: '500',
    },
    lightText: {
        color: '#1C1C1E',
    },
});
