/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

const LoadingScreen: React.FC = () => {
  const config = useSelector((state: RootState) => state.config);
  console.log('Current Config (LoadingSceen)::', config);
  if (config.error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Error: {config.error}</Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size="large" />
      <Text>{config.error || 'Loading Configuration'}</Text>
    </View>
  );
};

export default LoadingScreen;
