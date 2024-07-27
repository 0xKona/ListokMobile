import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ListokInput from '@app/components/ui/input';
import Icon from 'react-native-vector-icons/AntDesign';
import { ThemeType } from '@app/constants/themes';
import useTheme from '@app/components/hooks/useTheme';
import ListokButton from '@app/components/ui/button';

interface StepFormProps {
  addNewStep: (step: string) => void;
  closeForm: () => void;
}

const StepForm = ({ addNewStep, closeForm }: StepFormProps) => {
  const [stepDetail, setStepDetail] = React.useState('');
  const theme = useTheme(styles);

  const handleSubmit = () => {
    addNewStep(stepDetail);
    setStepDetail('');
  };

  const handleClose = () => {
    closeForm();
    setStepDetail('');
  };

  return (
    <>
      <View style={theme.closeButtonContainer}>
        <Text style={theme.title}>Add New Step</Text>
        <TouchableOpacity onPress={handleClose}>
          <Icon name="closecircle" size={20} />
        </TouchableOpacity>
      </View>

      <View style={theme.container}>
        <View style={theme.formSection}>
          <Text>Step Detail:</Text>
          <ListokInput value={stepDetail} onChangeText={setStepDetail} />
        </View>

        <View>
          <ListokButton text="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      width: '100%',
    },
    closeButtonContainer: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 30,
    },
    title: {
      fontSize: 20,
    },
    formSection: {
      marginBottom: 10,
    },
  });

export default StepForm;
