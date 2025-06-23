import { FlaggedValue, Value } from '@timing71/common';
import { ScrollView, View } from 'react-native';
import { ThemedText } from '../ThemedText';

type Props = {
  trackData?: (Value | FlaggedValue)[],
  trackDataSpec: string[]
}

export const TrackData = ({trackData, trackDataSpec}: Props) => {
  if (trackDataSpec.length === 0 || !trackData) {
    return (
      <ThemedText type='subtitle'>
        No track data available
      </ThemedText>
    );
  }

  return (
    <ScrollView>
      <View style={{ alignItems: 'center', rowGap: 8 }}>
        <ThemedText type='title'>
          Track data
        </ThemedText>
        {
          trackDataSpec.map(
            (spec, idx) => (
              <View
                key={idx}
                style={{ alignItems: 'center' }}
              >
                <ThemedText type='subtitle'>{spec}</ThemedText>
                <ThemedText>{trackData[idx]}</ThemedText>
              </View>
            )
          )
        }
      </View>
    </ScrollView>
  )
}
