import { formatOverviewName } from '@app/utils/settings';
import getUserProfilePicture from '@app/utils/getUserProfilePicture';
import { RootState } from '@redux/store';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const ProfileOverview = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <View style={styles.container}>
      {getUserProfilePicture(user.user?.picture, styles.profileIcon)}
      <View>
        <Text style={styles.text}>{formatOverviewName(user.user?.name)}</Text>
        <Text>{user.user.email}</Text>
        <Text>Created On: {user.user.accountCreated || 'Info not Found'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
  },
  profileIcon: {
    height: 100,
    width: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 40,
  },
});

export default ProfileOverview;
