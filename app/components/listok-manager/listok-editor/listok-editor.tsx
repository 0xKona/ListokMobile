import { RootState } from '@redux/store';
import React from 'react';
import { useSelector } from 'react-redux';
import ListokEditorDetails from './listok-details';
import ListokEditorWeekView from './listok-week-view';
import ListokEditorConfirmation from './listok-editor-confirmation';
import { ThemeType } from '@app/constants/themes';
import { StyleSheet, View } from 'react-native';
import useTheme from '@app/components/hooks/useTheme';

const ListokEditor = () => {
  const { currentStep } = useSelector((state: RootState) => state.listokEditor);
  const theme = useTheme(styles)

  switch (currentStep) {
    case 1:
      return (
        <View style={theme.container}>
          <ListokEditorDetails />
        </View>
      )
    case 2:
      return (
        <View style={theme.container}>
          <ListokEditorWeekView />
        </View>
      )
    case 3:
      return (
        <View style={theme.container}>
          <ListokEditorConfirmation />
        </View>
      )
    default:
      return;
  }
};

const styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20
  }
})

export default ListokEditor;
