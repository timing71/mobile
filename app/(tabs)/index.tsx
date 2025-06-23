import { Image } from 'expo-image';
import { Button, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ServiceRunning } from '@/components/serviceHost/ServiceRunning';
import { useServiceContext } from '@/components/serviceHost/context';
import { useNavigation } from 'expo-router';

type ItIsATabNavigatorHonest = {
  jumpTo: (slug: string)=> void
}

export default function HomeScreen() {

  const { launchTiming, service } = useServiceContext();
  const navigation = useNavigation() as ItIsATabNavigatorHonest;

  const launch = (url: string) => () => {
    launchTiming(url);
    navigation.jumpTo('timing');
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ServiceRunning />
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Launch TimeService demo service</ThemedText>
        <Button
          disabled={!!service}
          onPress={launch('https://livetiming.getraceresults.com/demo')}
          title="Go"
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Launch IndyCar service</ThemedText>
        <Button
          disabled={!!service}
          onPress={launch('https://www.indycar.com/leaderboard')}
          title="Go"
        />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Launch IMSA service</ThemedText>
        <Button
          disabled={!!service}
          onPress={launch('https://livetiming.alkamelsystems.com/imsa')}
          title="Go"
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
