// STANDARD / THIRD-PARTY IMPORTS
import React from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';

// LOCAL STYLES
import { styles } from './styles';

// TYPES
export type FirestoreTimestamp = {
  _seconds: number;
  _nanoseconds: number;
};

export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  timeStart: FirestoreTimestamp;
  timeEnd: FirestoreTimestamp;
}

// PROPS
type Props = {
  events: Event[];
  onEventPress: (event: Event) => void;
};

// COMPONENT
export default function AllEvents({ events, onEventPress }: Props) {
  // RENDER
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {events.map((event) => (
        <TouchableOpacity
          key={event.id}
          onPress={() => onEventPress(event)}
          style={styles.eventButton}
        >
          <Text style={styles.eventTitle}>{event.title}</Text>
          <Text style={styles.eventSubText}>{event.location}</Text>
        </TouchableOpacity>
      ))}

      {events.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No events found.</Text>
        </View>
      )}
    </ScrollView>
  );
}