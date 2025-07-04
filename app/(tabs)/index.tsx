import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { UpcomingSessions } from '@/components/dvr/UpcomingSessions';
import { ServiceRunning } from '@/components/serviceHost/ServiceRunning';
import { useServiceContext } from '@/components/serviceHost/context';
import { useNavigation } from 'expo-router';

type ItIsATabNavigatorHonest = {
  jumpTo: (slug: string)=> void
}

export default function HomeScreen() {

  const { launchTiming } = useServiceContext();
  const navigation = useNavigation() as ItIsATabNavigatorHonest;

  const launch = (url: string) => {
    launchTiming(url);
    navigation.jumpTo('timing');
  }

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
        >
          Timing71
        </ThemedText>
      </ThemedView>
      <ServiceRunning />
      <UpcomingSessions launch={launch} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    padding: 8,
    overflow: 'scroll'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8
  }
});
