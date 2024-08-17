import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@redux/store';
import { StackActions, useNavigation } from '@react-navigation/native';
import { LoadingScreenNavigationProp } from '@typed/navigation';
import { fetchConfig } from '@redux/slices/configSlice';

// TODO - (unrelated to this component). fix warn: Sending `onAnimatedValueUpdate` with no listeners registered.

interface NavigationProviderProps {
  children: ReactNode;
}

const NavigationContext = createContext({});

export const NavigationProvider: React.FC<NavigationProviderProps> = ({
  children,
}) => {
  
  const navigation = useNavigation<LoadingScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const config = useSelector((state: RootState) => state.config);
  const user = useSelector((state: RootState) => state.user);
  console.log('User (Navigation Context)::', user);

  useEffect(() => {
    if (!config.googleClientId) {
      console.log('No Google ClientID useEffect Triggered');
      dispatch(fetchConfig());
    }
  }, [dispatch, config.googleClientId]);

  useEffect(() => {
    if (!config.loading && !user.loading) {
      if (config.googleClientId && user.user) {
        navigation.dispatch(StackActions.replace('Home'));
      } else if (config.googleClientId && !user.user) {
        navigation.dispatch(StackActions.replace('Login'));
      }
    }
  }, [
    config.loading,
    user.loading,
    user.user,
    navigation,
    config.googleClientId,
  ]);

  return (
    <NavigationContext.Provider value={{}}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationManager = () => useContext(NavigationContext);
