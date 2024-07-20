import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './slices/userSlice';
import configReducer from './slices/configSlice';
import themeReducer from './slices/themeSlice';
import recipeEditorReducer from './slices/recipeEditorSlice';
import recipeManagerReducer from './slices/recipeManagerSlice';
import listokManagerReducer from './slices/listokManagerSlice';

const rootReducer = combineReducers({
  user: userReducer,
  config: configReducer,
  theme: themeReducer,
  recipeEditor: recipeEditorReducer,
  recipeManager: recipeManagerReducer,
  listokManager: listokManagerReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: [
    'user',
    'config',
    'theme',
    'recipeEditor',
    'recipeManager',
    'listokManager',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
