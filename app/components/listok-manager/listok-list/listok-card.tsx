import useTheme from '@app/components/hooks/useTheme';
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
import { Button, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface PropsInterface {
  data: any;
  refreshListoks: () => void;
}

const ListokCard = ({ data, refreshListoks }: PropsInterface) => {
  const navigation = useNavigation<ListokNavigationProp>();

  const { token } = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const componentStyles = useTheme(styles);

  const handleDeleteListok = () => {
    listokManagerApis.deleteListok(data.id, token);
    refreshListoks();
  };

  const openListok = () => {
    dispatch(resetListokEditor());
    dispatch(openListokEditor(data));
    navigation.navigate('New Listok');
  };

  return (
    <View style={componentStyles.container}>
      <Text>{data.title}</Text>
      <Text>{data.desc}</Text>
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexDirection: 'row' }}>
        <Button title="Delete Listok" onPress={() => handleDeleteListok()} />
        <Button title="Open Listok" onPress={openListok} />
      </View>
    </View>
  );
};

const styles = (props: ThemeType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      backgroundColor: props.surface,
      marginBottom: 2,
      height: 75,
      padding: 10,
    },
  });

export default ListokCard;
