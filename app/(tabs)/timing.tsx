import { useServiceContext } from '@/components/serviceHost/context';
import { ThemedText } from '@/components/ThemedText';
import { TimingScreen } from '@/components/timingScreen/TimingScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Timing() {

  const { service, state } = useServiceContext();

  if (!service) {
    return (
      <SafeAreaView>
        <ThemedText type='title'>There is no service running</ThemedText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <TimingScreen state={state} />
    </SafeAreaView>
  );
};
