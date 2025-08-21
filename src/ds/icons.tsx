// B4X4 v3.2 START
import * as React from 'react';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';

type Props = { size?: number; color?: string };

export const HomeIcon: React.FC<Props> = ({ size = 26, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5Z" stroke={color} strokeWidth={2} />
  </Svg>
);

export const BallIcon: React.FC<Props> = ({ size = 26, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2}/>
    <Path d="M3 12h18" stroke={color} strokeWidth={2}/>
    <Path d="M12 3c3 3 3 15 0 18" stroke={color} strokeWidth={2}/>
    <Path d="M7 5c-2 3-2 11 0 14M17 5c2 3 2 11 0 14" stroke={color} strokeWidth={2}/>
  </Svg>
);

export const VaultIcon: React.FC<Props> = ({ size = 26, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="6" width="18" height="12" rx="2" stroke={color} strokeWidth={2}/>
    <Rect x="6" y="9" width="5" height="4" rx="1" stroke={color} strokeWidth={2}/>
    <Rect x="14" y="9" width="4" height="7" rx="1" stroke={color} strokeWidth={2}/>
    <Line x1="3" y1="8" x2="21" y2="8" stroke={color} strokeWidth={2}/>
  </Svg>
);

export const VsIcon: React.FC<Props> = ({ size = 26, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 6l5 12" stroke={color} strokeWidth={2}/>
    <Path d="M5 18c2 0 3-1 4-3M8 9C7 7 6 6 4.5 6" stroke={color} strokeWidth={2}/>
    <Path d="M14 9c0-1.5 1.2-3 3.5-3 1.7 0 2.5.7 3.5 1.7M14 15c0 1.5 1.2 3 3.5 3 1.7 0 2.5-.7 3.5-1.7" stroke={color} strokeWidth={2}/>
  </Svg>
);

// B4X4 v6.1 START
export const TrophyIcon: React.FC<Props> = ({ size = 26, color = '#FFFFFF' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M6 4h12v2a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5V4Z" stroke={color} strokeWidth={2}/>
    <Path d="M6 6H4a2 2 0 0 0 2 2M18 6h2a2 2 0 0 1-2 2" stroke={color} strokeWidth={2}/>
    <Path d="M10 13h4v3H10z" stroke={color} strokeWidth={2}/>
    <Path d="M8 20h8" stroke={color} strokeWidth={2}/>
  </Svg>
);
// B4X4 v6.1 END
// B4X4 v3.2 END