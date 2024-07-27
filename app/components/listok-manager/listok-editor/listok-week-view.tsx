/* eslint-disable react-native/no-inline-styles */
import ListokButton from '@app/components/ui/button';
import { changeListokStep } from '@redux/slices/listokEditorSlice';
import { RootState } from '@redux/store';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import WeekdayCard from './weekday-card';

const ListokEditorWeekView = () => {
  const { listokData } = useSelector((state: RootState) => state.listokEditor);
  const dispatch = useDispatch();

  const handleBackPress = () => dispatch(changeListokStep(1));
  const handleNextPress = () => dispatch(dispatch(changeListokStep(3)));

  return (
    <View style={styles.container}>
      <View style={styles.weekdayContainer}>
        {Object.keys(listokData.days).map((day: string, index: number) => (
          <WeekdayCard index={index} />
        ))}
      </View>

      <View style={styles.buttonWrapper}>
        <ListokButton
          text="Back"
          onPress={handleBackPress}
          propStyles={{ width: '45%' }}
        />
        <ListokButton
          text="Next"
          onPress={handleNextPress}
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
  weekdayContainer: {
    margin: 10,
    width: '100%',
    flexGrow: 1,
    justifyContent: 'space-evenly',
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: '100%',
    marginTop: 'auto',
    margin: 10,
  },
});

export default ListokEditorWeekView;
