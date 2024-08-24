import React from "react";
import { StyleSheet, Text, View } from "react-native";
import useTheme from "../hooks/useTheme";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { ThemeType } from "@app/constants/themes";
import ListokButton from "../ui/button";
import { fetchConfig } from "@redux/slices/configSlice";
import LoadingSpinner from "../ui/loading-spinner";

const ConfigSetting = () => {
    const theme = useTheme(styles);
    const config = useSelector((state: RootState) => state.config);
    const dispatch = useDispatch<AppDispatch>();

    const handleRetry = () => {
        dispatch(fetchConfig());
    };

    return (
        <View style={theme.container}>
            {config.loading ? (
                <LoadingSpinner text="Loading Configuration..." />
            ) : (config.error || !config.googleClientId) ? (
                <>
                    <View style={theme.textContainer}>
                        <Text style={theme.textMessage}>There was an error setting up!</Text>
                        <Text style={theme.textMessage}>{'Check your internet connection \n and try again'}</Text>
                    </View>
                    <ListokButton text="Try Again" onPress={handleRetry} propStyles={theme.tryAgainButton} />
                </>
            ) : (
                <Text style={theme.textMessage}>Configuration loaded successfully!</Text>
            )}
        </View>
    );
};

const styles = (theme: ThemeType) => StyleSheet.create({
    container: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'center', // Center content
        alignItems: 'center', // Center content
    },
    textContainer: {
        marginTop: 60,
        alignItems: 'center', // Center text
    },
    textMessage: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 16,
    },
    tryAgainButton: {
        width: 200,
        marginTop: 10,
        borderRadius: 10
    },
});

export default ConfigSetting;
