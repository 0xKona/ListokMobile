import React from 'react';
import { StyleSheet, View } from 'react-native';
import Tab from './tab';
import { ThemeType } from '@app/constants/themes';
import useTheme from '../hooks/useTheme';

const TabNavigation = ({ state, descriptors, navigation }: any) => {
  const theme = useTheme(styles)

  return (
    <View style={theme.container}>
      {state.routes.map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Tab
            key={label}
            props={{ label, isFocused, options, onPress, onLongPress }}
          />
        );
      })}
    </View>
  );
};

const styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: 'black',
    borderTopWidth: 1,
    backgroundColor: theme.surface
  },
});

export default TabNavigation;
