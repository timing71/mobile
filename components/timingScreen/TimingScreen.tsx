import { ServiceState } from '@timing71/common';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { ThemedText } from '../ThemedText';
import { TimingTable } from './TimingTable';

type Props = {
  state?: ServiceState
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center'
  }
})

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
      <ThemedText style={styles.header}>
        {state.manifest.name} - {state.manifest.description}
      </ThemedText>
      <TimingTable state={state} />
    </SafeAreaView>
  )
};
