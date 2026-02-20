import { useState, useEffect } from "react";
import { Alert, View, Text, ActivityIndicator } from "react-native";
import EventForm from "@/components/events/EventForm";
import {
  EventTagsConfig,
  EventTagsSelection,
  Event,
} from "@shared/types/event";
import {
  initializeTagsSelection,
  combineDateAndTime,
  timestampToDate,
} from "@/utils/eventUtils";

export default function EditEventPage() {
  // Hardcoded event ID as specified
  const EVENT_ID = "xfoYNIRL86Ziv0S8R6St";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateStart, setDateStart] = useState(new Date());
  const [timeStart, setTimeStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [hostedBy, setHostedBy] = useState("");
  const [eventTagsConfig, setEventTagsConfig] =
    useState<EventTagsConfig | null>(null);
  const [maxAttendees, setMaxAttendees] = useState("");
  const [tagsSelection, setTagsSelection] = useState<EventTagsSelection>({});
  const [rsvpDeadline, setRsvpDeadline] = useState(new Date());
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch event on mount
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/events/${EVENT_ID}`,
          {
            method: "GET",
          },
        );

        if (!response.ok) {
          if (response.status === 404) {
            Alert.alert("Error", "Event not found");
          } else {
            Alert.alert("Error", "Failed to fetch event");
          }
          setLoading(false);
          return;
        }

        const event: any = await response.json();

        // Validate that we have basic event data
        if (!event || (!event.title && !event.id)) {
          Alert.alert("Error", "Invalid event data received");
          setLoading(false);
          return;
        }

        // Validate all required fields - throw error if missing
        const missingFields: string[] = [];
        if (!event.timeStart) missingFields.push("timeStart");
        if (!event.timeEnd) missingFields.push("timeEnd");
        if (!event.rsvpDeadline) missingFields.push("rsvpDeadline");
        if (event.maxAttendees == null) missingFields.push("maxAttendees");

        if (missingFields.length > 0) {
          Alert.alert(
            "Error",
            `Event data is missing required fields: ${missingFields.join(", ")}. Cannot edit this event.`,
          );
          setLoading(false);
          return;
        }

        // Convert FirestoreTimestamp to Date
        const timeStartDate = timestampToDate(event.timeStart);
        const timeEndDate = timestampToDate(event.timeEnd);
        const rsvpDeadlineDate = timestampToDate(event.rsvpDeadline);

        // Split date and time for start
        const startDate = new Date(timeStartDate);
        startDate.setHours(0, 0, 0, 0);
        const startTime = new Date(timeStartDate);
        startTime.setFullYear(1970, 0, 1);

        // Split date and time for end
        const endDate = new Date(timeEndDate);
        endDate.setHours(0, 0, 0, 0);
        const endTime = new Date(timeEndDate);
        endTime.setFullYear(1970, 0, 1);

        // Pre-fill form fields with defaults if missing
        setTitle(event.title || "");
        setDescription(event.description || "");
        setLocation(event.location || "");
        setDateStart(startDate);
        setTimeStart(startTime);
        setDateEnd(endDate);
        setTimeEnd(endTime);
        setPrice(event.price != null ? event.price.toString() : "0");
        setHostedBy(event.hostedBy || "");
        setMaxAttendees(
          event.maxAttendees != null ? event.maxAttendees.toString() : "",
        );
        setRsvpDeadline(rsvpDeadlineDate);
        setTagsSelection(event.tags || {});

        setLoading(false);
      } catch (error) {
        console.error("Error fetching event:", error);
        Alert.alert(
          "Error",
          error instanceof Error ? error.message : "Failed to fetch event",
        );
        setLoading(false);
      }
    };

    fetchEvent();
  }, []);

  const handleSubmit = async () => {
    if (!title || !description || !location) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      // Combine date and time for start and end
      const combinedTimeStart = combineDateAndTime(dateStart, timeStart);
      const combinedTimeEnd = combineDateAndTime(dateEnd, timeEnd);

      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/events/${EVENT_ID}`,
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
        },
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.error || "Failed to update event");
        return;
      }

      Alert.alert("Success", "Event updated successfully!");
      // User stays on edit page as specified
    } catch (error) {
      console.error("Error updating event:", error);
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to update event",
      );
    }
  };

  const getEventTagsConfig = async () => {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/config/categories`,
        {
          method: "GET",
        },
      );

      if (!response.ok) {
        console.error("Failed to fetch event tags config");
        return;
      }

      const config = (await response.json()) as EventTagsConfig;
      setEventTagsConfig(config);
      // Only initialize if tagsSelection is empty (not pre-filled from event)
      if (Object.keys(tagsSelection).length === 0) {
        setTagsSelection(initializeTagsSelection(config));
      }
    } catch (e) {
      console.error("Unable to get event tags config", e);
    }
  };

  useEffect(() => {
    getEventTagsConfig();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading event...</Text>
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
