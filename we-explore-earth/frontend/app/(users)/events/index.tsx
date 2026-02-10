//STANDARD LIBRARY
import { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

//THIRD-PARTY LIBRARIES

//LOCAL FILES
import { useUser } from '../../../hooks/useUser';
import EventView from '../../components/Calendar/eventView/eventView';
import EventDetails from '../../components/Calendar/eventDetails/eventDetails';
import type { Event } from '@shared/types/event';

type EventWithStatus = Event & { status?: string };
type Filter = 'All' | 'Yes' | 'Maybe';

export default function MyEventsScreen() {

  //REACT HOOKS
  const { user } = useUser();
  const userId = user?.id ?? null;

  //STATE VARIABLES
  const [events, setEvents] = useState<EventWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('All');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  //HANDLERS
  const handleEventPress = (event: Event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setModalVisible(false);
  };

  //EFFECTS
  const fetchMyEvents = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const baseUrl = process.env.EXPO_PUBLIC_API_URL;
    if (!baseUrl) {
      Alert.alert('Config Error', 'EXPO_PUBLIC_API_URL is not set.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/users/${userId}/events`);
      if (!res.ok) {
        Alert.alert('Error', `Failed to fetch events (${res.status})`);
        return;
      }

      const data: EventWithStatus[] = await res.json();
      setEvents(data);
    } catch {
      Alert.alert('Network Error', 'Could not fetch your events.');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchMyEvents();
  }, [fetchMyEvents]);

  //RENDER
  const filtered = events.filter((e) => {
    const s = (e.status ?? '').toUpperCase();
    if (filter === 'All') return true;
    if (filter === 'Yes') return s === 'YES';
    if (filter === 'Maybe') return s === 'MAYBE';
    return true;
  });

  if (!userId) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Sign in to see your events.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
          Your Events
        </Text>

        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
          {(['All', 'Yes', 'Maybe'] as const).map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 8,
                backgroundColor: filter === f ? '#2196F3' : '#eee',
              }}
            >
              <Text style={{ color: filter === f ? '#fff' : '#333' }}>
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <ScrollView>
            {filtered.map((event) => (
              <EventView
                key={event.id}
                event={event}
                onPress={handleEventPress}
              />
            ))}
          </ScrollView>
        )}

        <EventDetails
          visible={modalVisible && !!selectedEvent}
          event={selectedEvent}
          onClose={handleCloseModal}
        />
      </View>
    </SafeAreaView>
  );
}