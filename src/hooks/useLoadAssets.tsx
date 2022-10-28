import { Asset } from 'expo-asset';
import { useState } from 'react';
import { usePromiseAll } from './usePromiseAll';
import * as Font from 'expo-font';
import { DMSerifText_400Regular } from '@expo-google-fonts/dm-serif-text';
import {
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_600SemiBold,
  Lexend_700Bold,
} from '@expo-google-fonts/lexend';

type FontSource = Parameters<typeof Font.loadAsync>[0];

export const useLoadAssets = (assets: [], fonts: FontSource): boolean[] => {
  const [isAssetLoad, setAssetLoad] = useState(false);

  usePromiseAll([Font.loadAsync(fonts), ...assets.map(asset => Asset.loadAsync(asset))], () =>
    setAssetLoad(true),
  );

  const [isFontLoad] = Font.useFonts({
    DMSerif: DMSerifText_400Regular,
    LexendRegular: Lexend_400Regular,
    LexendMedium: Lexend_500Medium,
    LexendSemiBold: Lexend_600SemiBold,
    LexendBold: Lexend_700Bold,
  });

  return isAssetLoad && isFontLoad ? [true] : [false];
};
