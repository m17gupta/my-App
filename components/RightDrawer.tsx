import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useEffect } from 'react';
import {
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.85;

interface RightDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export const RightDrawer = ({ isOpen, onClose, children }: RightDrawerProps) => {
    const offset = useSharedValue(DRAWER_WIDTH);
    const opacity = useSharedValue(0);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (isOpen) {
            offset.value = withSpring(0, {
                damping: 20,
                stiffness: 90,
            });
            opacity.value = withTiming(1, { duration: 300 });
        } else {
            offset.value = withSpring(DRAWER_WIDTH, {
                damping: 20,
                stiffness: 90,
            });
            opacity.value = withTiming(0, { duration: 300 });
        }
    }, [isOpen]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: offset.value }],
    }));

    const backdropStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    if (!isOpen && opacity.value === 0) return null;

    return (
        <View style={StyleSheet.absoluteFill} pointerEvents={isOpen ? 'auto' : 'none'}>
            <TouchableWithoutFeedback onPress={onClose}>
                <Animated.View style={[styles.backdrop, backdropStyle]}>
                    <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
                </Animated.View>
            </TouchableWithoutFeedback>

            <Animated.View style={[styles.drawer, animatedStyle, { paddingTop: insets.top }]}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={28} color="#000" />
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    {children}
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    drawer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: DRAWER_WIDTH,
        backgroundColor: '#F8F9FA',
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: 'flex-start',
    },
    closeButton: {
        padding: 5,
    },
    content: {
        flex: 1,
    },
});
