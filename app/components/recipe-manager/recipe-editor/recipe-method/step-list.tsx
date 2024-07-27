import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { ThemeType } from '@app/constants/themes';
import useTheme from '@app/components/hooks/useTheme';
import { updateRecipeMethod } from '@redux/slices/recipeEditorSlice';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { MethodStepType } from '@typed/recipe-types';

interface PropsInterface {
  steps: MethodStepType[];
  setSteps: React.Dispatch<React.SetStateAction<MethodStepType[]>>;
}

const StepList = ({ steps, setSteps }: PropsInterface) => {
  const theme = useTheme(styles);
  const dispatch = useDispatch();

  const handleDelete = (indexToDelete: number) => {
    const newSteps = steps
      .filter(step => step.index !== indexToDelete)
      .map((step, index) => ({ ...step, index: index + 1 }));
    setSteps(newSteps);
    dispatch(updateRecipeMethod(newSteps));
  };

  const renderDelete = (index: number) => (
    <TouchableOpacity onPress={() => handleDelete(index)} style={theme.delete}>
      <Icon name="delete" size={20} />
    </TouchableOpacity>
  );

  const renderItem = ({ item, drag, isActive }: any) => (
    <Swipeable renderRightActions={() => renderDelete(item.index)}>
      <TouchableOpacity
        style={[theme.listItem, isActive ? theme.activeItem : null]}
        onLongPress={drag}
        key={item.index}>
        <Text>{`${item.index}. ${item.step}`}</Text>
      </TouchableOpacity>
    </Swipeable>
  );

  const handleDragEnd = ({ data }: any) => {
    const updatedSteps = data.map((step: MethodStepType, index: number) => ({
      ...step,
      index: index + 1,
    }));
    setSteps(updatedSteps);
    dispatch(updateRecipeMethod(updatedSteps));
  };

  return (
    <DraggableFlatList
      data={steps}
      renderItem={renderItem}
      keyExtractor={item => `draggable-item-${item.index}`}
      onDragEnd={handleDragEnd}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      flexGrow: 1,
    },
    delete: {
      height: 50,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    listItem: {
      backgroundColor: 'lightgrey',
      width: '100%',
      height: 50,
      padding: 10,
      marginBottom: 5,
    },
    activeItem: {
      backgroundColor: 'lightblue',
    },
  });

export default StepList;
