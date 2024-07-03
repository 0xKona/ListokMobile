import ListokButton from '@app/components/ui/button';
import { ThemeType } from '@app/constants/themes';
import { capitaliseWord } from '@app/utils/capitaliseWord';
import { RootState } from '@redux/store';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const AccountDetails = () => {
  const { currentTheme } = useSelector((state: RootState) => state.theme);
  const { user } = useSelector((state: RootState) => state.user);

  // TODO : Implement Delete Account in backend.
  const handleAccountDeletion = () => {
    return null;
  };

  return (
    <>
      <View style={styles(currentTheme).container}>
        <Text>{`Account Name: ${capitaliseWord(user.name)}`}</Text>
        <Text>{`Account Email: ${user.email}`}</Text>
        <Text>{`Account Created on: ${user.accountCreated}`}</Text>

        <View style={styles(currentTheme).warning}>
          <Text style={styles(currentTheme).warning}>
            Editing Account Details Coming Soon
          </Text>
        </View>
      </View>
      <View style={styles(currentTheme).deleteContainer}>
        <ListokButton
          onPress={handleAccountDeletion}
          text="Delete Your Account"
        />
      </View>
    </>
  );
};

const styles = (props: ThemeType) =>
  StyleSheet.create({
    container: {
      backgroundColor: props.surface,
      margin: 10,
      padding: 10,
    },
    warning: {
      justifyContent: 'center',
      alignItems: 'center',
      color: 'red',
      margin: 10,
    },
    deleteContainer: {
      marginTop: 'auto',
      padding: 10,
    },
  });

export default AccountDetails;
