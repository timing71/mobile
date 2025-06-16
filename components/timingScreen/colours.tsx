import { FlagState } from '@timing71/common';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export const classColours: Record<string, string> = {
  'p': '#FFFFFF',
  'lmp1': '#FF0000',
  'p1': '#FF0000',
  'hypercar': '#FF0000',
  'hypercarh': '#FF0000',
  'dpi': '#FFFFFF',
  'lmp2': '#77AAFF',
  'p2': '#77AAFF',
  'lmp2pa': '#57FFFF',
  'lmp2am': '#57FFFF',
  'lmp2p/a': '#57FFFF',
  'lmp2pro/am': '#57FFFF',
  'lmp2proam': '#57FFFF',
  'lmp3': '#DD00DD',
  'lmp3pro/am': '#f1a7ef',
  'p3': '#DD00DD',
  'p31': '#FF661C',
  'p32': '#549FFF',
  'js2r': '#33a7ff',
  'jsp4': '#FF5050',
  'cn': '#dbb700',
  'cn1': '#dbb700',
  'mpc': '#50C0FF',
  'gtlm': '#FF0000',
  'lmgte': '#FF4F00',
  'gte': '#FF4F00',
  'lmgteam': '#FF4F00',
  'lmgtepro': '#01FF01',
  'lmgt3': '#01FF01',
  'gt': '#FF4F00',
  'gtc': '#A0A0A0',
  'gtd': '#00dc67',
  'gtdpro': '#FF0000',
  'gt3': '#01FF01',
  'gt3p': '#CCCCCC',
  'gt3sa': '#FFFF00',
  'gt3pa': '#daa520',
  'gt3g': '#dbb700',
  'gold': '#dbb700',
  'gt4': '#33b772',
  'gt4s': '#ffc0cb',
  'gt4pa': '#ff00ff',
  'gs': '#2fabff',
  'gsx': '#2fabff',
  'tcr': '#FFFF00',
  'tce': '#fdce12',
  'gt3pro': '#dbb700',
  'gt3am': '#CCCCCC',
  'at': '#CCCCCC',
  'gtx': '#e35a25',
  'sp2': '#77AAFF',
  'sp3': '#FF00FF',
  'tcx': '#FF00FF',
  'sp4': '#29d105',
  'sp4t': '#89d115',
  'sp3t': '#6e92ee',
  'sp6': '#77C0FA',
  'sp7': '#00FF00',
  'sp8': '#CC88CC',
  'sp8t': '#FF8888',
  'sp9pro': '#66FF66',
  'sp9pro-am': '#FFFF66',
  'sp10': '#FF4F00',
  'v2t': '#FFF0A0',
  'v3t': '#FFDD00',
  'v4': '#DDD0DD',
  'v5': '#F4A4FF',
  'v6': '#50C0FF',
  'vt3': '#CCCCCC',
  'vt2': '#cb67ec',
  '991': '#01FF01',
  '992': '#58bdf3',
  'a2': '#ffb8b8',
  'tc': '#c5b6ff',
  'cup-x': '#FFFFFF',
  'klcup5': '#DDFFFF',
  'cup3': '#FFFFAA',
  'app': '#ff50a4',
  'apa': '#fdff50',
  'aam': '#cb67ec',
  'i': '#89d115',
  'inv': '#89d115',
  'a': '#FFFF00',
  'b': '#6e92ee',
  'c': '#f68002',
  'd': '#cb67ec',
  'e': '#FF4F00',
  'r': '#CCCCCC',
  'bronze': '#f29b42',
  'bronzecup': '#f29b42',
  'proam': '#f0f33c',
  'am': '#1fcc67',
  'lbcup': '#1cc3ff',
  'silver': '#CCCCCC',
  'sil': '#CCCCCC',
  'pam': '#FFFF00',
  'h4': '#FFFFAA',
  'pa991': '#d22730'
}

export const modifiers: Record<string, StyleProp<TextStyle>> = {
  pb: {
    color: '#00FF00'
  },
  sb: {
    color: '#FF53E3'
  },
  old: {
    color: 'yellow'
  },
  red: {
    color: 'red'
  },
  green: {
    color: '#00FF00'
  }
};

export const carStateCell: Record<string, StyleProp<TextStyle>> = {
  RUN: {
    color: '#00FF00'
  },
  OUT: {
    color: '#FF6418'
  },
  PIT: {
    color: '#DC291E'
  },
  FUEL: {
    color: '#DC291E'
  },
  STOP: {
    color: 'grey'
  },
  RET: {
    color: 'grey'
  },
  'N/S': {
    color: 'grey'
  }
}

export const carStateRow: Record<string, StyleProp<TextStyle>> = {
  OUT: {
    backgroundColor: '#553300'
  },
  PIT: {
    backgroundColor: '#550000'
  },
  FUEL: {
    backgroundColor: '#550000'
  },
  STOP: {
    backgroundColor: 'grey'
  },
  'N/S': {
    color: 'yellow'
  }
}

export const carStateRowAlt: Record<string, StyleProp<TextStyle>> = {
  OUT: {
    backgroundColor: '#603F00'
  },
  PIT: {
    backgroundColor: '#5C0000'
  },
  FUEL: {
    backgroundColor: '#5C0000'
  },
  STOP: {
    backgroundColor: 'grey'
  }
}

export const flagStates: Record<string, StyleProp<ViewStyle & TextStyle>> = {
  [FlagState.GREEN]: {
    backgroundColor: '#009900',
    color: 'white'
  },
  [FlagState.YELLOW]: {
    backgroundColor: '#DDDD00',
    color: 'black',
  },
  [FlagState.RED]: {
    backgroundColor: '#990000',
    color: 'white',
    //animation: css`${blinkingAnim} 1s step-end alternate infinite`
  },
  [FlagState.SC]: {
    backgroundColor: '#DDDD00',
    color: 'black',
    //animation: flashyAnim
  },
  [FlagState.SLOW_ZONE]: {
    //background: 'linear-gradient(135deg, rgba(0,153,0,1) 0%, rgba(0,153,0,1) 50%, rgba(221,221,0,1) 60%, rgba(221,221,0,1) 100%)',
    color: 'white',
    //fill: 'url(#slow_zone)'
  },
  [FlagState.CAUTION]: {
    backgroundColor: '#DDDD00',
    color: 'black',
    //animation: flashyAnim
  },
  [FlagState.FCY]: {
    backgroundColor: '#DDDD00',
    color: 'black',
    //animation: flashyAnim
  },
  [FlagState.VSC]: {
    backgroundColor: '#DDDD00',
    color: 'black',
    //animation: flashyAnim
  },
  [FlagState.CODE_60]: {
    backgroundColor: '#ff53e3',
    color: 'white',
    //animation: flashyAnim
  },
  [FlagState.CODE_60_ZONE]: {
    //background: 'linear-gradient(135deg, rgba(0,153,0,1) 0%, rgba(0,153,0,1) 50%, rgba(255,83,227,1) 60%, rgba(255,83,227,1) 100%)',
    color: 'white',
    //fill: 'url(#code_60_zone)'
  },
  [FlagState.CHEQUERED]: {
    //background: css`left/contain repeat-x url(${chequer})`,
    //fill: 'url(#chequer)',
    color: 'transparent'
  },
  [FlagState.WHITE]: {
    backgroundColor: 'white',
    color: 'black'
  },
  [FlagState.NONE]: {
    backgroundColor: 'black',
    color: 'white'
  }
};
