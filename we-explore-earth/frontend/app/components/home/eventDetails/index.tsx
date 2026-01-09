// STANDARD / THIRD-PARTY IMPORTS
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

// LOCAL STYLES
import { styles } from './styles';

// TYPES
import type { Event } from '../allEvents';

// PROPS
type Props = {
  visible: boolean;
  event: Event | null;
  onClose: () => void;
};

// HELPERS
const formatTimestamp = (ts: { _seconds: number; _nanoseconds: number }) => {
  const date = new Date(ts._seconds * 1000);
  return date.toLocaleString();
};

// COMPONENT
export default function EventDetails({ visible, event, onClose }: Props) {
  // RENDER
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalCard}>
          {event ? (
            <>
              <Text style={styles.title}>{event.title}</Text>
              <Text style={styles.body}>{event.description}</Text>

              <Text style={styles.meta}>
                Location: {event.location}
              </Text>
              <Text style={styles.meta}>
                Start: {formatTimestamp(event.timeStart)}
              </Text>
              <Text style={styles.meta}>
                End: {formatTimestamp(event.timeEnd)}
              </Text>
            </>
          ) : (
            <Text style={styles.title}>No event selected.</Text>
          )}

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}