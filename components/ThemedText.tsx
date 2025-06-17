import { StyleSheet, Text, type TextProps } from 'react-native';

import { Colors } from '@/constants/Colors';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = Colors.dark.text;

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'DejaVuSans'
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    //fontWeight: '600',
    fontFamily: 'DejaVuSans'
  },
  title: {
    fontSize: 32,
    lineHeight: 32,
    fontFamily: 'Play-Bold'
  },
  subtitle: {
    fontSize: 20,
    //fontWeight: 'bold',
    fontFamily: 'Play-Bold',
    color: Colors.app.highlight
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
    fontFamily: 'DejaVuSans'
  },
});
