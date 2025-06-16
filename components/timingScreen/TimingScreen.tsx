import { ServiceState } from '@timing71/common';
import { SafeAreaView, Text } from 'react-native';
import { FlagPanel } from './FlagPanel';
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
      <FlagPanel state={state} />
      <TimingTable state={state} />
    </SafeAreaView>
  )
};
