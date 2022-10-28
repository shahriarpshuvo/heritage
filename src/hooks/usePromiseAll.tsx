import { Asset } from 'expo-asset';
import { useEffect } from 'react';

export const usePromiseAll = (promises: Promise<void | Asset[]>[], cb: () => void) =>
  useEffect(() => {
    (async () => {
      await Promise.all(promises);
      cb();
    })();
  });
