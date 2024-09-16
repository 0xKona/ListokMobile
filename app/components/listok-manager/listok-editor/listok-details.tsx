import useTheme from '@app/components/hooks/useTheme';
import ListokButton from '@app/components/ui/button';
import ListokInput from '@app/components/ui/input';
import { ThemeType } from '@app/constants/themes';
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

  const theme = useTheme(styles);

  console.log(listokData);

  const handleNextPress = () => {
    // TODO validate inputs
    dispatch(updateListokTitle(title));
    dispatch(updateListokDesc(desc));
    dispatch(changeListokStep(2));
  };

  return (
    <View style={theme.container}>
      <Text style={theme.titleText}>Details</Text>
      <View style={theme.inputSection}>
        <ListokInput 
          inputName='Listok Name*'
          value={title} 
          onChangeText={setTitle}
          backgroundColor={theme.container.backgroundColor}
          textColor={theme.container.color}
        />
      </View>
      <View style={theme.inputSection}>
        <ListokInput 
          inputName='Description'
          value={desc} 
          onChangeText={setDesc} 
          backgroundColor={theme.container.backgroundColor}
          textColor={theme.container.color}
        />
      </View>
      <View style={theme.buttonContainer}>
        <ListokButton text="Next" onPress={handleNextPress} propStyles={{borderRadius: 5}}/>
      </View>
    </View>
  );
};

const styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    backgroundColor: theme.surface,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '100%',
    color: theme.surfaceText
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  titleText: {
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 20,
    color: theme.surfaceText
  },
  inputSection: {
    marginTop: 10,
  },
});

export default ListokEditorDetails;
