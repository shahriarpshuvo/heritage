import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { InitialState, NavigationContainer } from '@react-navigation/native';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import { DMSerifText_400Regular } from '@expo-google-fonts/dm-serif-text';
import {
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_600SemiBold,
  Lexend_700Bold,
} from '@expo-google-fonts/lexend';

const customFonts = {
  LalSabujRegular: require('./assets/fonts/LalSabuj-Regular.ttf'),
  LalSabujBold: require('./assets/fonts/LalSabuj-Bold.ttf'),
};

export type FontSource = Parameters<typeof Font.loadAsync>[0];

const usePromiseAll = (promises: Promise<void | Asset[]>[], cb: () => void) =>
  useEffect(() => {
    (async () => {
      await Promise.all(promises);
      cb();
    })();
  });

const useLoadAssets = (assets: number[], fonts: FontSource): boolean => {
  const [ready, setReady] = useState(false);
  usePromiseAll([Font.loadAsync(fonts), ...assets.map(asset => Asset.loadAsync(asset))], () =>
    setReady(true),
  );
  return ready;
};

interface AppContainerProps {
  fonts?: FontSource;
  assets?: number[];
  children: ReactElement | ReactElement[];
}

const NAVIGATION_STATE_KEY = `NAVIGATION_STATE_KEY-${Constants.manifest?.sdkVersion}`;

const AppContainer = ({ assets, children }: AppContainerProps) => {
  const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);
  const [initialState, setInitialState] = useState<InitialState | undefined>();
  const ready = useLoadAssets(assets || [], customFonts || {});
  const [isFontLoaded] = useFonts({
    DMSerif: DMSerifText_400Regular,
    LexendRegular: Lexend_400Regular,
    LexendMedium: Lexend_500Medium,
    LexendSemiBold: Lexend_600SemiBold,
    LexendBold: Lexend_700Bold,
  });

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

    if (!isNavigationReady) {
      restoreState();
    }
  }, [isNavigationReady]);

  const onStateChange = useCallback(
    state => AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state)),
    [],
  );

  if (!ready || !isNavigationReady || !isFontLoaded) {
    return <AppLoading />;
  }
  return <NavigationContainer {...{ onStateChange, initialState }}>{children}</NavigationContainer>;
};

export default AppContainer;
