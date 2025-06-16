import { MessageList } from '@/components/messages/MessageList';
import { useServiceContext } from '@/components/serviceHost/context';
import { RequiresService } from '@/components/serviceHost/RequiresService';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Messages() {
  const { state } = useServiceContext();
  return (
    <SafeAreaView>
      <RequiresService>
        <MessageList messages={state?.messages || []} />
      </RequiresService>
    </SafeAreaView>
  )
}
