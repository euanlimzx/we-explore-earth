import { useState, useEffect } from "react";
import { Alert } from "react-native";
import EventForm from "./EventForm";
import { EventTagsConfig, EventTagsSelection } from "../../../types/eventTags";

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

export default function CreateEvent() {
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
        `${process.env.EXPO_PUBLIC_API_URL}/events/create`,
        {
          method: "POST",
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
        Alert.alert("Error", data.error || "Failed to create event");
        return;
      }

      Alert.alert("Success", "Event created successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setHostedBy("");
      const now = new Date();
      setDateStart(now);
      setTimeStart(now);
      setDateEnd(now);
      setTimeEnd(now);
      setPrice("");
      // Reset tags selection
      if (eventTagsConfig) {
        setTagsSelection(initializeTagsSelection(eventTagsConfig));
      }
      setMaxAttendees("")
      setRsvpDeadline(now)
      setImageUri(null);
    } catch (error) {
      console.error("Error creating event:", error);
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to create event"
      );
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
      // Find the event_tags document by id
      const eventTagsDoc = data.find((doc: { id: string }) => doc.id === "event_tags");
      if (eventTagsDoc) {
        const { id, ...config } = eventTagsDoc;
        setEventTagsConfig(config as EventTagsConfig);
        setTagsSelection(initializeTagsSelection(config as EventTagsConfig));
      }
    } catch (e) {
      console.error("Unable to get event tags config", e);
    }
  };

  useEffect(() => {
    getEventTagsConfig();
  }, []);

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
      submitButtonText="Create Event"
      formTitle="Create New Event"
    />
  );
}
