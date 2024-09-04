import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Icon from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { ThemeType } from '@app/constants/themes';
import useTheme from '@app/components/hooks/useTheme';
import { updateRecipeMethod } from '@redux/slices/recipeEditorSlice';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { MethodStepType, StepType } from '@typed/recipe-types';
import { actionSheet } from '@app/components/ui/action-sheet';

interface PropsInterface {
  steps: MethodStepType[];
  setSteps: React.Dispatch<React.SetStateAction<MethodStepType[]>>;
}

const StepList = ({ steps, setSteps }: PropsInterface) => {
  const theme = useTheme(styles);
  const dispatch = useDispatch();

  const swipeableRef = React.useRef<any>(null);
  const closeSwipeable = () => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  }

  const handleDelete = (indexToDelete: number) => {
    const newSteps = steps
      .filter(step => step.index !== indexToDelete)
      .map((step, index) => ({ ...step, index: index + 1 }));
    setSteps(newSteps);
    dispatch(updateRecipeMethod(newSteps));
  };

  const handlePressDelete = (index: number) => {
    const actions = [{actionName: 'Delete Step', actionFunction: () => {closeSwipeable(); handleDelete(index)}}]
    actionSheet(actions, 1, closeSwipeable)
  }

  const renderDelete = (index: number) => (
    <TouchableOpacity onPress={() => handlePressDelete(index)} style={theme.delete}>
      <Icon name="delete" size={20} />
    </TouchableOpacity>
  );

  const RenderItem = ({ item, drag, isActive }: any) => (
    <Swipeable ref={swipeableRef} renderRightActions={() => renderDelete(item.index)} overshootRight={false}>
      <TouchableOpacity
        style={[theme.listItem, isActive ? theme.activeItem : null]}
        onLongPress={drag}
        key={item.index}>
        <Text>{`Step ${item.index}: ${item.step}`}</Text>
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
      renderItem={RenderItem}
      keyExtractor={item => `draggable-item-${item.index}`}
      onDragEnd={handleDragEnd}
      style={theme.flatlist}
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
      backgroundColor: theme.surface,
      width: '100%',
      height: 50,
      padding: 10,
      marginBottom: 5,
      borderColor: theme.highlight,
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: 'center'
    },
    activeItem: {
      backgroundColor: 'lightblue',
    },
    flatlist: {
      width: '100%',
      height: '95%'
    }
  });

export default StepList;
