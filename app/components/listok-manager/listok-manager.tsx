import React from 'react';
import { StyleSheet, View } from 'react-native';
import ListoksHeader from './listoks-header/listoks-header';
import ListokList from './listok-list/listok-list';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@redux/store';
import { fetchListoks } from '@redux/slices/listokManagerSlice';
import { useIsFocused } from '@react-navigation/native';
import { ThemeType } from '@app/constants/themes';
import useTheme from '../hooks/useTheme';

export interface ListokManagerTabInterface {
  name: 'Your Listoks' | 'Imported Listoks';
  value: 'users' | 'imported';
}

export const ListokManagerTabs: ListokManagerTabInterface[] = [
  { name: 'Your Listoks', value: 'users' },
  { name: 'Imported Listoks', value: 'imported' },
];

const ListokManager = () => {
  const [currentTab, setCurrentTab] = React.useState<ListokManagerTabInterface>(
    ListokManagerTabs[0],
  );
  const isFocused = useIsFocused();

  const theme = useTheme(styles)

  const { userId, token } = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch<AppDispatch>();
  const handlePressTab = (tab: ListokManagerTabInterface) => {
    setCurrentTab(tab);
  };

  const refreshListoks = () => {
    console.log('Refresh Listoks Called');
    dispatch(fetchListoks({ userId, token }));
  };

  React.useEffect(() => {
    refreshListoks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, userId, isFocused]);

  return (
    <View style={theme.container}>
      <ListoksHeader currentTab={currentTab} handlePressTab={handlePressTab} />
      <ListokList currentTab={currentTab} refreshListoks={refreshListoks} />
    </View>
  );
};

const styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: theme.background,
    width: '100%',
    height: '100%'
  },
});

export default ListokManager;
