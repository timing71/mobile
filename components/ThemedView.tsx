import { View, type ViewProps } from 'react-native';

import { Colors } from '@/constants/Colors';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, ...otherProps }: ThemedViewProps) {
  const backgroundColor = Colors.dark.background;

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
