import { useServiceContext } from '@/components/serviceHost/context';
import { RequiresService } from '@/components/serviceHost/RequiresService';
import { TrackData } from '@/components/trackData/TrackData';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TrackDataList() {
  const { state } = useServiceContext();
  return (
    <SafeAreaView>
      <RequiresService>
        <TrackData
          trackData={state?.session.trackData || []}
          trackDataSpec={state?.manifest.trackDataSpec || []}
        />
      </RequiresService>
    </SafeAreaView>
  )
}
