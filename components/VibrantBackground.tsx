import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);

export const VibrantBackground = ({ children }: { children?: React.ReactNode }) => {
    const anim1 = useSharedValue(0);
    const anim2 = useSharedValue(0);
    const anim3 = useSharedValue(0);

    useEffect(() => {
        anim1.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 10000 }),
                withTiming(0, { duration: 10000 })
            ),
            -1
        );
        anim2.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 12000 }),
                withTiming(0, { duration: 12000 })
            ),
            -1
        );
        anim3.value = withRepeat(
            withSequence(
                withTiming(1, { duration: 15000 }),
                withTiming(0, { duration: 15000 })
            ),
            -1
        );
    }, []);

    const style1 = useAnimatedStyle(() => ({
        transform: [
            { translateX: interpolate(anim1.value, [0, 1], [-50, 50]) },
            { translateY: interpolate(anim2.value, [0, 1], [-30, 80]) },
            { scale: interpolate(anim3.value, [0, 1], [1, 1.2]) }
        ],
        opacity: interpolate(anim1.value, [0, 0.5, 1], [0.4, 0.7, 0.4])
    }));

    const style2 = useAnimatedStyle(() => ({
        transform: [
            { translateX: interpolate(anim2.value, [0, 1], [100, -80]) },
            { translateY: interpolate(anim1.value, [0, 1], [50, -100]) },
            { scale: interpolate(anim2.value, [0, 1], [0.8, 1.1]) }
        ],
        opacity: interpolate(anim2.value, [0, 0.5, 1], [0.3, 0.6, 0.3])
    }));

    const style3 = useAnimatedStyle(() => ({
        transform: [
            { translateX: interpolate(anim3.value, [0, 1], [-100, 120]) },
            { translateY: interpolate(anim2.value, [0, 1], [200, -50]) },
            { scale: interpolate(anim1.value, [0, 1], [1.2, 0.9]) }
        ],
        opacity: interpolate(anim3.value, [0, 0.5, 1], [0.5, 0.8, 0.5])
    }));

    return (
        <View style={styles.container}>
            {/* Deep Base Layer */}
            <LinearGradient
                colors={['#1a0b2e', '#0a1024']}
                style={StyleSheet.absoluteFill}
            />

            {/* Moving Glows */}
            <AnimatedGradient
                colors={['#5D26C1', 'transparent']}
                style={[styles.glow, styles.glow1, style1]}
            />
            <AnimatedGradient
                colors={['#22E1FF', 'transparent']}
                style={[styles.glow, styles.glow2, style2]}
            />
            <AnimatedGradient
                colors={['#FF7E5F', 'transparent']}
                style={[styles.glow, styles.glow3, style3]}
            />

            {/* Blur Overlay to blend */}
            <BlurView intensity={80} style={StyleSheet.absoluteFill} tint="dark" />

            {/* Content Container */}
            <View style={StyleSheet.absoluteFill}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    glow: {
        position: 'absolute',
        width: width * 1.5,
        height: width * 1.5,
        borderRadius: width * 0.75,
    },
    glow1: {
        top: -width * 0.3,
        left: -width * 0.5,
    },
    glow2: {
        bottom: -width * 0.2,
        right: -width * 0.4,
    },
    glow3: {
        top: height * 0.3,
        left: width * 0.2,
        width: width * 1.2,
        height: width * 1.2,
    },
});
