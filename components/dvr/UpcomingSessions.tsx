import { Colors } from '@/constants/Colors';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useUpcomingQuery } from '.';
import { ThemedText } from '../ThemedText';
import { SessionView } from './SessionView';

type Props = {
  launch: (url: string) => void
}

export const UpcomingSessions = ({ launch }: Props) => {

  const sessions = useUpcomingQuery();

  return (
    <View style={styles.container}>
      <ThemedText
        type='subtitle'
        style={styles.title}
      >
        Upcoming sessions
      </ThemedText>

      <ScrollView style={styles.list}>
        {
          sessions.isSuccess && sessions.data.items.map(
            s => (
              <Pressable
                key={s.sessionID}
                onPress={() => launch(s.source)}
              >
                <SessionView
                  session={s}
                />
              </Pressable>
            )
          )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.app.backgroundAlt,
    flexShrink: 1,
    flexGrow: 1,
    overflow: 'hidden',
    minHeight: 0
  },
  title: {
    textAlign: 'center',
    marginVertical: 8
  },
  list: {
    flexShrink: 1,
    minHeight: 0
  }
})
