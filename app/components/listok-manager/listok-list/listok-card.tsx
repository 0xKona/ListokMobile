import useTheme from '@app/components/hooks/useTheme';
import { ActionInterface, actionSheet } from '@app/components/ui/action-sheet';
import { ThemeType } from '@app/constants/themes';
import { listokManagerApis } from '@app/utils/api-connections/listok-manager-api';
import { useNavigation } from '@react-navigation/native';
import {
  openListokEditor,
  resetListokEditor,
} from '@redux/slices/listokEditorSlice';
import { RootState } from '@redux/store';
import { ListokNavigationProp } from '@typed/navigation';
import React from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';

interface PropsInterface {
  data: any;
  refreshListoks: () => void;
}

const ListokCard = ({ data, refreshListoks }: PropsInterface) => {
  const navigation = useNavigation<ListokNavigationProp>();

  const { token } = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const theme = useTheme(styles);

  const swipeableRef = React.useRef<any>(null);
  const closeSwipeable = () => {
    if (swipeableRef.current) {
      swipeableRef.current.close();
    }
  }

  const handleDeleteListok = () => {
    closeSwipeable();
    listokManagerApis.deleteListok(data.id, token);
    refreshListoks();
  };

  const confirmDelete = () => {
    const actions: ActionInterface[] = [{actionName: 'Delete this recipe', actionFunction: handleDeleteListok}];
    actionSheet(actions, 1, closeSwipeable);
  }

  const openListok = () => {
    dispatch(resetListokEditor());
    dispatch(openListokEditor(data));
    navigation.navigate('New Listok');
  };

  const renderRightAction = () => (
    <TouchableOpacity style={{height: 75, aspectRatio: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}} onPress={confirmDelete}>
      <Icon name='trash-alt' size={20} color={'white'}/>
    </TouchableOpacity>
  )

  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderRightAction} overshootRight={false} >
      <View style={theme.container}>
        <View style={theme.titleContainer} >
          <Text style={theme.titleContainerText}>{data.title}</Text>
          <Text style={theme.titleContainerText}>{data.desc}</Text>
        </View>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <TouchableOpacity style={{ marginLeft: 'auto', height: 75, aspectRatio: 1, justifyContent: 'center', alignItems: 'center'}} onPress={openListok} >
          <Icon name='edit' size={20} color={theme.titleContainerText.color}/>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: theme.surface,
      marginBottom: 2,
      height: 75,
      flexDirection: 'row',
    },
    titleContainer: {
      height: '100%',
      justifyContent: 'center',
      padding: 20,
    },
    titleContainerText: {
      color: theme.surfaceText
    },
  });

export default ListokCard;
