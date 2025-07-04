import { useServiceContext } from '@/components/serviceHost/context';
import { RequiresService } from '@/components/serviceHost/RequiresService';
import { TimingScreen } from '@/components/timingScreen/TimingScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Timing() {

  const { state } = useServiceContext();

  return (
    <SafeAreaView>
      <RequiresService requireState>
        <TimingScreen state={state} />
      </RequiresService>
    </SafeAreaView>
  );
};
