import ListokButton from '@app/components/ui/button';
import ListokInput from '@app/components/ui/input';
import {
  changeListokStep,
  updateListokDesc,
  updateListokTitle,
} from '@redux/slices/listokEditorSlice';
import { RootState } from '@redux/store';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const ListokEditorDetails = () => {
  const dispatch = useDispatch();
  const { listokData } = useSelector((state: RootState) => state.listokEditor);

  const [title, setTitle] = React.useState(listokData.title);
  const [desc, setDesc] = React.useState(listokData.desc);

  console.log(listokData);

  const handleNextPress = () => {
    // TODO validate inputs
    dispatch(updateListokTitle(title));
    dispatch(updateListokDesc(desc));
    dispatch(changeListokStep(2));
  };

  return (
    <View style={styles.container}>
      <Text>Details</Text>
      <Text>Listok name:</Text>
      <ListokInput value={title} onChangeText={setTitle} />
      <Text>Listok description:</Text>
      <ListokInput value={desc} onChangeText={setDesc} />

      <View style={styles.buttonContainer}>
        <ListokButton text="Next" onPress={handleNextPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: '100%',
  },
  buttonContainer: {
    marginTop: 'auto',
  },
});

export default ListokEditorDetails;
