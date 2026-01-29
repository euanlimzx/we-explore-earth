import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from './styles';
import type { Event } from '@shared/types/event';

type Props = {
  event: Event;
  onPress: (event: Event) => void;
};

export default function EventView({ event, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(event)}>
      <View>
        <Text style={styles.title}>{event.title}</Text>
        <Text>{event.location}</Text>
      </View>
    </TouchableOpacity>
  );
}