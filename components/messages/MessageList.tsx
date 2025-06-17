import { Colors } from '@/constants/Colors';
import { Message, dayjs } from '@timing71/common';
import { ScrollView, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { classColours } from '../timingScreen/colours';

const styles = StyleSheet.create({
  container: {
  },
  message: {
    flexDirection: 'row',
    gap: 10,
  },
  messageAlt: {
    backgroundColor: Colors.app.backgroundAlt
  },
  messageText: {
    color: 'white',
    fontSize: 18,
    padding: 4
  },
  date: {
    color: Colors.app.highlight,
    paddingBottom: 0,
    textAlign: 'center'
  },
  msgClass: {
    paddingTop: 0,
    textAlign: 'center'
  }
});

type MessageDisplayProps = {
  message: Message,
  index: number
}

export const msgStyles: Record<string, StyleProp<TextStyle & ViewStyle>> = {
  'pit': {
    backgroundColor: '#550000',
    color: 'white'
  },
  'out': {
    backgroundColor: '#553300',
    color: 'white'
  },
  'green': {
    backgroundColor: '#009900'
  },
  'yellow': {
    backgroundColor: '#DDDD00',
    color: 'black'
  },
  'red': {
    backgroundColor: '#990000',
    color: 'white'
  },
  'code60': {
    backgroundColor: Colors.app.code60,
    color: 'white'
  },
  'pb': {
    color: '#00FF00'
  },
  'sb': {
    color: '#FF53E3'
  },
  'system': {
    color: Colors.app.highlight
  }
}

const msgAltStyles: Record<string, StyleProp<TextStyle & ViewStyle>> = {
  'pit': {
    backgroundColor: '#5C0000',
  },
  'out': {
    backgroundColor: '#603F00',
  }
}

const MessageDisplay = ({ index, message }: MessageDisplayProps) => {

  const [timestamp, category, msgText, msgStyle] = message;
  const isOddRow = index % 2 === 1;

  const classColour = classColours[category.toLowerCase().replaceAll(/[-/ ]/g, '')];

  return (
    <View style={[
      styles.message,
      isOddRow && styles.messageAlt
    ]}>
      <View style={{ flex: 1 }}>
        <Text style={[styles.messageText, styles.date]}>{dayjs(timestamp).format('HH:mm:ss')}</Text>
        <Text style={[styles.messageText, styles.msgClass, { color: classColour }]}>{category}</Text>
      </View>
      <Text style={[
        styles.messageText,
        { flex: 3, paddingLeft: 8 },
        msgStyle && msgStyles[msgStyle],
        msgStyle && isOddRow && msgAltStyles[msgStyle],
      ]}>
        {msgText}
      </Text>
    </View>
  );
}

type Props = {
  messages: Message[]
};

export const MessageList = ({ messages }: Props) => {
  return (
    <ScrollView style={styles.container}>
      {
        messages.map(
          (msg, idx) => <MessageDisplay index={idx} key={idx} message={msg} />
        )
      }
    </ScrollView>
  )
};
