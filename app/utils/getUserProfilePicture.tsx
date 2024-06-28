import { navBarIconStyle } from '@app/styles/navBarIcon';
import React from 'react';
import { Image } from 'react-native';

const getUserProfilePicture = (url: string) => {
  return (
    <Image
      style={navBarIconStyle}
      source={{
        uri: url,
      }}
    />
  );
};

export default getUserProfilePicture;
