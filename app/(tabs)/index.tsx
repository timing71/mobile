import { Image } from 'expo-image';
import { Button, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { connectionService, createServiceForURL } from '@/components/serviceHost';
import { ServiceRunning } from '@/components/serviceHost/ServiceRunning';
import { useServiceContext } from '@/components/serviceHost/context';
import { Events, ServiceState } from '@timing71/common';
import { useNavigation } from 'expo-router';

type ItIsATabNavigatorHonest = {
  jumpTo: (slug: string)=> void
}

export default function HomeScreen() {

  const { service, setService, setState } = useServiceContext();
  const navigation = useNavigation() as ItIsATabNavigatorHonest;

  const launch = () => {
    if (service) {
      service.stop();
    }
    const newService = createServiceForURL('https://livetiming.getraceresults.com/demo');
    if (newService) {
      newService.on(Events.STATE_CHANGE, (state: ServiceState) => {
        setState?.(state)
      })
      newService.start(connectionService);
      setService?.(newService);
      navigation.jumpTo('timing');
    }
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
          onPress={launch}
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
