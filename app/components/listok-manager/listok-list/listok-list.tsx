import useTheme from '@app/components/hooks/useTheme';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { ListokInterface } from '@typed/listok-types';
import EmptyListokList from './empty-listok-list';
import ListokCard from './listok-card';
import { ListokManagerTabInterface } from '../listok-manager';
import { ThemeType } from '@app/constants/themes';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RefreshControl } from 'react-native-gesture-handler';

interface PropsInterface {
  currentTab: ListokManagerTabInterface;
  refreshListoks: () => void;
}

const ListokList = ({ currentTab, refreshListoks }: PropsInterface) => {
  const theme = useTheme(styles);
  const { userListoks, loadingListoks } = useSelector(
    (state: RootState) => state.listokManager,
  );
  console.log('Current Listok Tab: ', currentTab)
  return (
    currentTab.value === "users" ? (
      <FlatList
        refreshControl={
          <RefreshControl 
            refreshing={loadingListoks} 
            onRefresh={refreshListoks} 
            colors={['white', 'white']} 
            tintColor={theme.constructionText.color}
          />
        }
        extraData={loadingListoks}
        contentContainerStyle={{ flexGrow: 1 }}
        style={theme.container}
        data={userListoks}
        renderItem={({ item }) => (
          <ListokCard data={item} refreshListoks={refreshListoks} />
        )}
        keyExtractor={(listok: ListokInterface) => String(listok.id)}
        ListEmptyComponent={<EmptyListokList />}
      />
    ) : (
      <View style={theme.construction}>
        <Icon name="construction" size={100} color={theme.constructionText.color}/>
        <Text style={theme.constructionText} >{"Imma be real dawg, \n I just haven't had time to do this yet"}</Text>
      </View>
    )

  );
};

const styles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
    },
    construction: {
      justifyContent: 'center',
      alignItems: 'center',
      flexGrow: 1,
      backgroundColor: theme.surface,
      width: '100%',
      height: '100%',
    },
    constructionText: {
      textAlign: 'center',
      color: theme.surfaceText
    }
  });

export default ListokList;
