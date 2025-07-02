import 'react-native-get-random-values'; // polyfill needed by uuid

import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@timing71/services';
import 'expo-dev-client';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ServiceContextProvider } from '@/components/serviceHost/context';

export default function RootLayout() {
  const [loaded] = useFonts({
    'DejaVuSans': require('../assets/fonts/DejaVuSans.ttf'),
    'Play-Bold': require('../assets/fonts/Play/Play-Bold.ttf'),
    'Play-Regular': require('../assets/fonts/Play/Play-Regular.ttf')
  });

  const queryClient = new QueryClient();

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={DarkTheme}>
      <QueryClientProvider client={queryClient}>
        <ServiceContextProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ServiceContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
