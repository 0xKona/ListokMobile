/* eslint-disable react-native/no-inline-styles */
import ListokButton from '@app/components/ui/button';
import { listokManagerApis } from '@app/utils/api-connections/listok-manager-api';
import { useNavigation } from '@react-navigation/native';
import { changeListokStep } from '@redux/slices/listokEditorSlice';
import { RootState } from '@redux/store';
import { ListokNavigationProp } from '@typed/navigation';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const ListokEditorConfirmation = () => {
  const listok = useSelector((state: RootState) => state.listokEditor);
  const { userId, name, token } = useSelector(
    (state: RootState) => state.user.user,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation<ListokNavigationProp>();

  const handleBackPress = () => dispatch(changeListokStep(2));

  const handleConfirmPress = async () => {
    if (listok.existingListok) {
      console.log('Existing listok Submit Triggered: ', listok.listokData);
      try {
        await listokManagerApis.updateExistingListok(
          JSON.stringify(listok.listokData),
          token,
        );
        navigation.navigate('Your Listoks');
      } catch (error) {
        console.log('Error submitting changes: ', error);
      }
    } else {
      try {
        console.log('listokSubmitted: ', listok.listokData);
        await listokManagerApis.postNewListok(
          JSON.stringify({
            ...listok.listokData,
            createdBy: userId,
            createdByName: name,
          }),
          token,
        );
        navigation.navigate('Your Listoks');
      } catch (error) {
        console.error('Error submitting listok:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Confirmation</Text>
      <Text>{JSON.stringify(listok.listokData)}</Text>

      <View style={styles.buttonWrapper}>
        <ListokButton
          text="Back"
          onPress={handleBackPress}
          propStyles={{ width: '45%' }}
        />
        <ListokButton
          text="Confirm and Save"
          onPress={handleConfirmPress}
          propStyles={{ width: '45%' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%',
    marginTop: 'auto',
    margin: 10,
  },
});

export default ListokEditorConfirmation;
