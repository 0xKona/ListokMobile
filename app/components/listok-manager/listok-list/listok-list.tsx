import useTheme from '@app/components/hooks/useTheme';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { ListokInterface } from '@typed/listok-types';
import EmptyListokList from './empty-listok-list';
import ListokCard from './listok-card';

interface PropsInterface {
  refreshListoks: () => void;
}

const ListokList = ({ refreshListoks }: PropsInterface) => {
  const componentStyle = useTheme(styles);
  const { userListoks, loadingListoks } = useSelector(
    (state: RootState) => state.listokManager,
  );

  return (
    <FlatList
      refreshing={loadingListoks}
      onRefresh={refreshListoks}
      extraData={loadingListoks}
      style={componentStyle.container}
      data={userListoks}
      renderItem={({ item }) => (
        <ListokCard data={item} refreshListoks={refreshListoks} />
      )}
      keyExtractor={(listok: ListokInterface) => String(listok.id)}
      ListEmptyComponent={<EmptyListokList />}
    />
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
    },
  });

export default ListokList;
