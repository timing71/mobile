import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as Orientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import '@timing71/services';

import { ServiceContextProvider } from '@/components/serviceHost/context';
import { useEffect } from 'react';

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(
    () => {
      const unlockScreenOrientation = async () => {
        await Orientation.unlockAsync()
      }
      unlockScreenOrientation()
    },
    []
  );

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
      <ServiceContextProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ServiceContextProvider>
    </ThemeProvider>
  );
}
