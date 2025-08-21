// B4X4 v3.8 START
import React, { useRef } from 'react';
import { Pressable } from 'react-native';
import Video from 'react-native-video';

type Props = {
  uri: string;
  playing: boolean;
  onToggle?: () => void;
};

export default function ReelPlayer({ uri, playing, onToggle }: Props) {
  const ref = useRef<Video>(null);

  return (
    <Pressable
      onPress={onToggle}
      style={{ width: '100%', aspectRatio: 9 / 16, backgroundColor: '#080808', borderRadius: 12, overflow: 'hidden' }}
    >
      <Video
        ref={ref}
        source={{ uri }}
        resizeMode="cover"
        repeat
        paused={!playing}
        style={{ width: '100%', height: '100%' }}
        muted={false}
      />
    </Pressable>
  );
}
// B4X4 v3.8 END