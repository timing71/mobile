import { Car, StatExtractor, StatType, timeInSeconds } from '@timing71/common';
import { Image, ImageStyle, StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { carStateCell, classColours, modifiers } from './colours';

type Props = {
  car: Car,
  stat: StatType,
  statExtractor: StatExtractor,
  style?: StyleProp<TextStyle>
}

const styles = StyleSheet.create({
  centered: {
    textAlign: 'center'
  },
  right: {
    textAlign: 'right'
  }
});

export const TimingTableCell = ({ car, stat, statExtractor, style }: Props) => {

  const applicableStyles: StyleProp<TextStyle | ImageStyle>[] = [
    style
  ];

  let value = statExtractor.get(car, stat);

  if (['Class', 'Num', 'Laps', 'Pits'].includes(stat[0])) {
    applicableStyles.push(styles.centered);
  }
  else if (stat[1] === 'numeric') {
    applicableStyles.push(styles.right)
  }

  if (stat[0] === 'Class') {
    const carClass = (value as string).toLowerCase().replaceAll(/[-/ ]/g, '');

    if (classColours[carClass]) {
      applicableStyles.push({
        color: classColours[carClass]
      });
    }

  }

  if (stat[0] === 'State') {
    if (carStateCell[value]) {
      applicableStyles.push(carStateCell[value]);
    }

    if (value === 'FIN') {
      return (
        <Image
          height={30}
          resizeMode='cover'
          source={require('@/assets/images/chequer.png')}
          style={applicableStyles as ImageStyle}
          width={60}
        />
      )
    }
  }

  if (Array.isArray(value)) {
    if (Object.keys(modifiers).includes(value[1])) {
      applicableStyles.push(modifiers[value[1]]);
    }
    value = value[0];
  }

  return (
    <Text
      numberOfLines={1}
      style={applicableStyles}
    >
      { formatValue(value, stat[1]) }
    </Text>
  )
}

const formatValue = (value: any, formatKey: string) => {

  if (formatKey === 'time') {
    return timeInSeconds(value, 3);
  }
  else if (formatKey === 'laptime') {
    return timeInSeconds(value, 3);
  }
  else if (formatKey === 'delta') {
    return timeInSeconds(value, 3);
  }

  return value;
};
