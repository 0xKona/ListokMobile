import { navBarIconStyle } from '@app/styles/navBarIcon';
import React from 'react';
import { Image } from 'react-native';

const getUserProfilePicture = (url: string, styles?: StyleMedia) => {
  return (
    <Image
      style={styles ? styles : navBarIconStyle}
      source={{
        uri: url,
      }}
    />
  );
};

export default getUserProfilePicture;
