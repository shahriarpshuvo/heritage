import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InitialState, NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import Constants from 'expo-constants';
import { useLoadAssets } from '@app/hooks';

interface AppContainerProps {
  assets?: [];
  children: ReactElement | ReactElement[];
}

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${Constants.manifest?.sdkVersion}`;

const CUSTOM_FONTS = {
  LalSabujRegular: require('@app/assets/fonts/LalSabuj-Regular.ttf'),
  LalSabujBold: require('@app/assets/fonts/LalSabuj-Bold.ttf'),
};

SplashScreen.preventAutoHideAsync();
export const AppContainer = ({ assets, children }: AppContainerProps) => {
  const [initialState, setInitialState] = useState<InitialState | undefined>();
  const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);
  const [isAssetReady] = useLoadAssets(assets || [], CUSTOM_FONTS || {});

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(NAVIGATION_STATE_KEY);
        const state = savedStateString ? JSON.parse(savedStateString) : undefined;
        setInitialState(state);
      } finally {
        setIsNavigationReady(true);
      }
    };
    if (!isNavigationReady) restoreState();
  }, [isNavigationReady]);

  const onStateChange = useCallback(
    async (state: any) => AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state)),
    [],
  );

  const onAppReady = useCallback(async () => {
    if (isNavigationReady && isAssetReady) {
      await SplashScreen.hideAsync();
    }
  }, [isNavigationReady, isAssetReady]);

  if (!isNavigationReady || !isAssetReady) return null;
  return (
    <NavigationContainer
      onReady={onAppReady}
      initialState={initialState}
      onStateChange={onStateChange}
    >
      {children}
    </NavigationContainer>
  );
};
