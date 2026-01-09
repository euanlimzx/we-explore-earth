// STANDARD / THIRD-PARTY IMPORTS
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert, SafeAreaView } from 'react-native';

// LOCAL COMPONENTS
import AllEvents, { Event } from '../../components/home/allEvents';
import EventDetails from '../../components/home/eventDetails';

export default function HomeScreen() {
  // STATE VARIABLES
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  // DATA FETCHING
  const fetchEvents = async () => {
    const baseUrl = process.env.EXPO_PUBLIC_API_URL;

    if (!baseUrl) {
      Alert.alert('Config Error', 'EXPO_PUBLIC_API_URL is not set.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/events`);

      if (!res.ok) {
        Alert.alert('Error', `Failed to fetch events (status ${res.status})`);
        return;
      }

      const data: Event[] = await res.json();
      setEvents(data);
    } catch (error) {
      Alert.alert('Network Error', 'Could not fetch events.');
    } finally {
      setLoading(false);
    }
  };

  // HANDLERS
  const handleEventPress = (event: Event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
    setModalVisible(false);
  };

  // EFFECTS
  useEffect(() => {
    fetchEvents();
  }, []);

  // RENDER
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, padding: 16 }}>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
              Events
            </Text>

            <AllEvents
              events={events}
              onEventPress={handleEventPress}
            />

            <EventDetails
              visible={modalVisible}
              event={selectedEvent}
              onClose={handleCloseModal}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}