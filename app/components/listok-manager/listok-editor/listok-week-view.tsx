/* eslint-disable react-native/no-inline-styles */
import ListokButton from '@app/components/ui/button';
import { changeListokStep } from '@redux/slices/listokEditorSlice';
import { RootState } from '@redux/store';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import WeekdayCard from './weekday-card';

const ListokEditorWeekView = () => {
  const { listokData } = useSelector((state: RootState) => state.listokEditor);
  const dispatch = useDispatch();

  const handleBackPress = () => dispatch(changeListokStep(1));
  const handleNextPress = () => dispatch(dispatch(changeListokStep(3)));

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.weekdayContainer}>
        {Object.keys(listokData.days).map((day: string, index: number) => (
          <WeekdayCard index={index} />
        ))}
      </ScrollView>

      <View style={styles.buttonWrapper}>
        <ListokButton
          text="Back"
          onPress={handleBackPress}
          propStyles={{ width: '45%', borderRadius: 5 }}
        />
        <ListokButton
          text="Next"
          onPress={handleNextPress}
          propStyles={{ width: '45%', borderRadius: 5 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  weekdayContainer: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'space-evenly',
    marginBottom: 20
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%',
    marginTop: 'auto',
    marginVertical: 20,
  },
});

export default ListokEditorWeekView;
