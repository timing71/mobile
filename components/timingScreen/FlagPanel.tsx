import { dasherizeParts, FlagState, ServiceState } from '@timing71/common';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { cancelAnimation, Easing, interpolateColor, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { flagStates } from './colours';

type Props = {
  state: ServiceState
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    margin: 6
  }
});

type AnimatedPanelProps = {
  text: string
}

const YellowFlashingFlagPanel = ({ text }: AnimatedPanelProps) => {
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ['#FFFF00', '#000000']
      ),
      color: interpolateColor(
        progress.value,
        [0, 1],
        ['#000000', '#FFFFFF'],
        'HSV'
      )
    };
  });

  useEffect(
    () => {
      progress.value = withRepeat(
        withTiming(1, {duration: 500}),
        -1,
        true
      );

      return () => {
        cancelAnimation(progress);
      }
    },
    [progress]
  )

  return (
    <Animated.View style={animatedStyle}>
      <Animated.Text style={[styles.text, animatedStyle]}>{text}</Animated.Text>
    </Animated.View>
  )
}

const RedFlashingFlagPanel = ({ text }: AnimatedPanelProps) => {
  const progress = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ['#F00', '#000']
      )
    };
  });

  useEffect(
    () => {
      progress.value = withRepeat(
        withTiming(1, {duration: 1000, easing: Easing.steps(1)}),
        -1,
        true
      );

      return () => {
        cancelAnimation(progress);
      }
    },
    [progress]
  )

  return (
    <Animated.View style={animatedStyle}>
      <Animated.Text style={styles.text}>{text}</Animated.Text>
    </Animated.View>
  )
}

const ANIMATED_PANELS = {
  [FlagState.RED]: RedFlashingFlagPanel,
  [FlagState.SC]: YellowFlashingFlagPanel,
  [FlagState.VSC]: YellowFlashingFlagPanel,
  [FlagState.FCY]: YellowFlashingFlagPanel
}

export const FlagPanel = ({ state }: Props) => {
  const text = dasherizeParts(state.manifest.name, state.manifest.description);

  if (ANIMATED_PANELS[state.session.flagState]) {
    const Panel = ANIMATED_PANELS[state.session.flagState];
    return (
      <Panel text={text} />
    )
  }
  else {
    const viewStyle = flagStates[state.session.flagState];

    return (
      <View style={viewStyle}>
        <Text style={styles.text}>{text}</Text>
      </View>
    )
  }

}
