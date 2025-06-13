import { ServiceState } from '@timing71/common';
import { SafeAreaView, Text } from 'react-native';
import { ThemedText } from '../ThemedText';
import { TimingTable } from './TimingTable';

type Props = {
  state?: ServiceState
}

export const TimingScreen = ({ state }: Props) => {
  if (!state) {
    return (
      <SafeAreaView>
        <Text>Waiting for timing data...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView>
      <ThemedText>
        {state.manifest.name} - {state.manifest.description}
      </ThemedText>
      <TimingTable state={state} />
    </SafeAreaView>
  )
};
