import { dasherizeParts } from '@timing71/common';
import { Button, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { useServiceContext } from './context';

export const ServiceRunning = () => {
  const { service, setService, state, setState } = useServiceContext();

  if (!service) {
    return null;
  }

  return (
    <View>
      <ThemedText type='subtitle'>
        There is a service running:
      </ThemedText>
      {
        state && (
          <ThemedText type='default'>
            { dasherizeParts(state?.manifest.name, state?.manifest.description) }
          </ThemedText>
        )
      }
      <Button
        onPress={() => {
          service.stop();
          setService?.(undefined);
          setState?.(undefined);
        }}
        title='Stop'
      />
    </View>
  )
}
