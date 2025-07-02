import { dayjs } from '@timing71/common';
import { StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { ThemedText } from '../ThemedText';
import { IconSymbol } from '../ui/IconSymbol';
import { Session } from './types';

type Props = {
  session: Session
};

export const SessionView = ({ session }: Props) => {

  const sessionStyles = [
    session.started && styles.live,
    !session.started && styles.upcoming
  ];

  return (
    <View
      style={[styles.container, ...sessionStyles]}
    >
      <View style={[styles.textContainer, ...sessionStyles]}>
        <ThemedText style={styles.title}>
          {session.description}
        </ThemedText>
        <ThemedText style={styles.date}>
          {dayjs(session.start).format('D MMM YYYY HH:mm')}
        </ThemedText>
      </View>
      <View style={styles.icon}>
        <IconSymbol
          color={session.started ? 'white' : '#808080'}
          name={session.started ? 'play' : 'stopwatch.fill'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'black',
    marginHorizontal: 8,
    marginVertical: 4,
    alignItems: 'center',
    backgroundColor: Colors.app.background,
  },
  textContainer: {
    flexShrink: 1,
    flexGrow: 1
  },
  upcoming: {
    backgroundColor: 'black',
    color: 'white',
  },
  live: {
    backgroundColor: 'green',
    borderColor: 'green',
    color: 'white'
  },
  title: {
    fontFamily: 'Play-Bold',
    padding: 4,
    fontSize: 18
  },
  date: {
    fontFamily: 'Play-Regular',
    padding: 4,
    backgroundColor: Colors.app.backgroundAlt
  },
  icon: {
    flexShrink: 0,
    marginHorizontal: 12
  }
})
