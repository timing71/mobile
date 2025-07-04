import { Colors } from '@/constants/Colors';
import { dasherizeParts } from '@timing71/common';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ThemedText } from '../ThemedText';
import { IconSymbol } from '../ui/IconSymbol';
import { useServiceContext } from './context';

export const ServiceRunning = () => {
  const { service, setService, state, setState } = useServiceContext();

  if (!service) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Currently viewing:
        </Text>
        {
          state && (
            <ThemedText type='default' style={styles.text}>
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
      <View style={styles.icon}>
        <IconSymbol
          color='white'
          name='play'
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    borderWidth: 2,
    borderColor: 'green',
    backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textContainer: {
    flexGrow: 1,
    flexShrink: 1
  },
  title: {
    color: 'white',
    backgroundColor: 'green',
    fontFamily: 'Play-Bold',
    fontSize: 20,
    padding: 8
  },
  text: {
    backgroundColor: Colors.app.backgroundAlt,
    padding: 8
  },
  icon: {
    flexShrink: 0,
    marginHorizontal: 12
  }
})
