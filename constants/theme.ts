/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 */

import { Platform } from 'react-native';

const tintColorLight = '#345891'; // Existing Navy Blue
const tintColorDark = '#BF953F';  // Existing Gold

export const Colors = {
  light: {
    text: '#11181C',
    background: '#F8F9FB',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    vibrantPurple: '#5D26C1',
    vibrantBlue: '#22E1FF',
    vibrantPink: '#FF7E5F',
    meshGradient: ['#1a0b2e', '#5D26C1', '#22E1FF', '#FF7E5F'],
  },
  dark: {
    text: '#ECEDEE',
    background: '#0a1024',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    vibrantPurple: '#5D26C1',
    vibrantBlue: '#22E1FF',
    vibrantPink: '#FF7E5F',
    meshGradient: ['#0a1024', '#1a0b2e', '#5D26C1', '#22E1FF'],
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
});
