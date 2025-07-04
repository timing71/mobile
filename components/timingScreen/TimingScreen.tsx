import { ServiceState } from '@timing71/common';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Clocks } from './Clocks';
import { FlagPanel } from './FlagPanel';
import { TimingTable } from './TimingTable';

type Props = {
  state?: ServiceState
}

export const TimingScreen = ({ state }: Props) => {
  if (!state) {
    return (
      <SafeAreaView>
        <ThemedText type='title'>Waiting for timing data...</ThemedText>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlagPanel state={state} />
      <Clocks state={state} />
      <TimingTable state={state} />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    overflow: 'scroll'
  }
})
