import { ServiceState, timeWithHours } from '@timing71/common';
import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  state: ServiceState
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
  },
  clock: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'DejaVuSans'
  }
});

export const Clocks = ({ state }: Props) => {

  const useLaps = state.session.lapsRemain !== undefined;
  const { timeElapsed, timeRemain, lapsRemain, pauseClocks } = state.session;

  return (
    <View style={styles.container}>
      {
        timeElapsed !== undefined && (
          <Clock
            caption='elapsed'
            pause={pauseClocks}
            seconds={timeElapsed}
          />
        )
      }
      {
        !useLaps && timeRemain !== undefined && (
          <Clock
            caption='remaining'
            countdown
            pause={pauseClocks}
            seconds={timeRemain}
          />
        )
      }
      {
        useLaps && (
          <Text style={styles.clock}>{lapsRemain} lap{ lapsRemain === 1 ? '' : 's' } remaining</Text>
        )
      }
    </View>
  )
};

type ClockProps = {
  caption: string,
  countdown?: boolean,
  pause?: boolean,
  seconds: number
}

const Clock = ({ caption, countdown, pause, seconds }: ClockProps) => {

  const refTime = useRef(Date.now());
  const pauseTime = useRef(0);

  const [ actualSeconds, setActualSeconds ] = useState(seconds);

  useEffect(
    () => {
      refTime.current = Date.now();
    },
    [seconds]
  );

  const tick = useCallback(
    () => {
      const delta = (countdown ? -1 : 1) * (Date.now() - refTime.current) / 1000;
      setActualSeconds(Math.max(0, seconds + delta));
    },
    [countdown, seconds, setActualSeconds]
  );

  useEffect(
    () => {
      if (!pause) {
        if (pauseTime.current > 0) {
          const pauseDelta = (countdown ? 1 : -1) * (Date.now() - pauseTime.current);
          refTime.current += pauseDelta;
          pauseTime.current = 0;
        }
        const interval = window.setInterval(tick, 100);
        return () => {
          window.clearInterval(interval);
        };
      }
      else {
        pauseTime.current = Date.now();
        tick();
      }
    },
    [countdown, pause, tick]
  );

  return (
    <Text style={styles.clock}>
      { timeWithHours(actualSeconds) } { caption }
    </Text>
  );
};
