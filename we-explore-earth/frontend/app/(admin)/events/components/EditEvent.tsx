import { useState, useEffect } from "react";
import { Alert, ActivityIndicator, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import EventForm from "./EventForm";
import { EventTagsConfig, EventTagsSelection } from "@/types/eventTags";

// Initialize tags selection with all options set to false
const initializeTagsSelection = (config: EventTagsConfig): EventTagsSelection => {
  const selection: EventTagsSelection = {};
  for (const [fieldName, options] of Object.entries(config)) {
    if (Array.isArray(options)) {
      selection[fieldName] = {};
      for (const option of options) {
        selection[fieldName][option] = false;
      }
    }
  }
  return selection;
};

// Helper function to combine date and time into a Date object
const combineDateAndTime = (date: Date, time: Date): Date => {
  const combined = new Date(date);
  combined.setHours(time.getHours());
  combined.setMinutes(time.getMinutes());
  combined.setSeconds(time.getSeconds());
  combined.setMilliseconds(time.getMilliseconds());
  return combined;
};

// Helper function to split a Date into date and time components
const splitDateAndTime = (dateTime: Date) => {
  const date = new Date(dateTime);
  const time = new Date(dateTime);
  return { date, time };
};

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  timeStart: string | Date;
  timeEnd: string | Date;
  price: number;
  hostedBy: string;
  tags: EventTagsSelection;
  maxAttendees: number;
  rsvpDeadline: string | Date;
}

export default function EditEvent() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateStart, setDateStart] = useState(new Date());
  const [timeStart, setTimeStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [hostedBy, setHostedBy] = useState("");
  const [eventTagsConfig, setEventTagsConfig] = useState<EventTagsConfig | null>(null);
  const [maxAttendees, setMaxAttendees] = useState("");
  const [tagsSelection, setTagsSelection] = useState<EventTagsSelection>({});
  const [rsvpDeadline, setRsvpDeadline] = useState(new Date());
  const [imageUri, setImageUri] = useState<string | null>(null);

  const fetchEvent = async () => {
    if (!id) {
      Alert.alert("Error", "Event ID is required");
      router.back();
      return;
    }

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/events/${id}`
      );

      if (!response.ok) {
        Alert.alert("Error", "Failed to fetch event");
        router.back();
        return;
      }

      const event: Event = await response.json();

      // Populate form with event data
      setTitle(event.title || "");
      setDescription(event.description || "");
      setLocation(event.location || "");
      setHostedBy(event.hostedBy || "");
      setPrice(event.price?.toString() || "0");
      setMaxAttendees(event.maxAttendees?.toString() || "");

      // Handle dates
      const startDate = event.timeStart ? new Date(event.timeStart) : new Date();
      const endDate = event.timeEnd ? new Date(event.timeEnd) : new Date();
      const rsvpDate = event.rsvpDeadline ? new Date(event.rsvpDeadline) : new Date();

      const { date: startDateOnly, time: startTimeOnly } = splitDateAndTime(startDate);
      const { date: endDateOnly, time: endTimeOnly } = splitDateAndTime(endDate);

      setDateStart(startDateOnly);
      setTimeStart(startTimeOnly);
      setDateEnd(endDateOnly);
      setTimeEnd(endTimeOnly);
      setRsvpDeadline(rsvpDate);

      // Handle tags
      if (event.tags) {
        setTagsSelection(event.tags);
      }
    } catch (error) {
      console.error("Error fetching event:", error);
      Alert.alert("Error", "Failed to load event");
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const getEventTagsConfig = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/config`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch event tags config");
        return;
      }

      const data = await response.json();
      const eventTagsDoc = data.find((doc: { id: string }) => doc.id === "event_tags");
      if (eventTagsDoc) {
        const { id, ...config } = eventTagsDoc;
        setEventTagsConfig(config as EventTagsConfig);
        // Only initialize if tagsSelection is empty (not loaded from event yet)
        if (Object.keys(tagsSelection).length === 0) {
          setTagsSelection(initializeTagsSelection(config as EventTagsConfig));
        }
      }
    } catch (e) {
      console.error("Unable to get event tags config", e);
    }
  };

  useEffect(() => {
    getEventTagsConfig();
    fetchEvent();
  }, [id]);

  const handleSubmit = async () => {
    if (!title || !description || !location) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    if (!id) {
      Alert.alert("Error", "Event ID is required");
      return;
    }

    try {
      // Combine date and time for start and end
      const combinedTimeStart = combineDateAndTime(dateStart, timeStart);
      const combinedTimeEnd = combineDateAndTime(dateEnd, timeEnd);

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/events/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
            location,
            timeStart: combinedTimeStart.toISOString(),
            timeEnd: combinedTimeEnd.toISOString(),
            price,
            hostedBy,
            tags: tagsSelection,
            maxAttendees,
            rsvpDeadline: rsvpDeadline.toISOString(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.error || "Failed to update event");
        return;
      }

      Alert.alert("Success", "Event updated successfully!");
      router.back();
    } catch (error) {
      console.error("Error updating event:", error);
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to update event"
      );
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <EventForm
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      location={location}
      setLocation={setLocation}
      dateStart={dateStart}
      setDateStart={setDateStart}
      timeStart={timeStart}
      setTimeStart={setTimeStart}
      dateEnd={dateEnd}
      setDateEnd={setDateEnd}
      timeEnd={timeEnd}
      setTimeEnd={setTimeEnd}
      eventTagsConfig={eventTagsConfig}
      tagsSelection={tagsSelection}
      onTagsChange={setTagsSelection}
      price={price}
      setPrice={setPrice}
      hostedBy={hostedBy}
      setHostedBy={setHostedBy}
      maxAttendees={maxAttendees}
      setMaxAttendees={setMaxAttendees}
      rsvpDeadline={rsvpDeadline}
      setRsvpDeadline={setRsvpDeadline}
      imageUri={imageUri}
      setImageUri={setImageUri}
      onSubmit={handleSubmit}
      submitButtonText="Update Event"
      formTitle="Edit Event"
    />
  );
}
