import { ThemeType } from '@app/constants/themes';
import React from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import useTheme from '../hooks/useTheme';

interface LoadingSpinnerProps {
    text?: string; // Optional text prop
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text }) => {
    const spinValue = React.useRef(new Animated.Value(0)).current;
    const theme = useTheme(styles)

    React.useEffect(() => {
        // Setup spin animation
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [spinValue]);

    // Interpolate rotation from spinValue
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={theme.overlay}>
            <Animated.View style={[theme.spinner, { transform: [{ rotate: spin }] }]} />
            <Text style={theme.text}>{text && text}</Text>
        </View>
    );
};

const styles = (theme: ThemeType) => StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    spinner: {
        width: 50,
        height: 50,
        borderWidth: 5,
        borderColor: '#ffffff',
        borderTopColor: '#282828',
        borderRadius: 25,
    },
    text: {
        marginTop: 20,
        fontSize: 16,
        color: theme.backgroundText,
    },
});

export default LoadingSpinner;
