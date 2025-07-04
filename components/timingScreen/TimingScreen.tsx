import { ServiceState } from '@timing71/common';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Clocks } from './Clocks';
import { FlagPanel } from './FlagPanel';
import { TimingTable } from './TimingTable';

type Props = {
  state?: ServiceState
}

export const TimingScreen = ({ state }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlagPanel state={state!} />
      <Clocks state={state!} />
      <TimingTable state={state!} />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    overflow: 'scroll'
  }
})
