import { useState } from "react";
import { Alert } from "react-native";
import EventForm from "./EventForm";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());
  const [location, setLocation] = useState("");

  const handleSubmit = async () => {
    if (!title || !description || !location) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/events/create`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
            location,
            timeStart: timeStart.toISOString(),
            timeEnd: timeEnd.toISOString(),
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
      setTimeStart(new Date());
      setTimeEnd(new Date());
    } catch (error) {
      console.error("Error creating event:", error);
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to create event"
      );
    }
  };

  return (
    <EventForm
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      location={location}
      setLocation={setLocation}
      timeStart={timeStart}
      setTimeStart={setTimeStart}
      timeEnd={timeEnd}
      setTimeEnd={setTimeEnd}
      onSubmit={handleSubmit}
      submitButtonText="Create Event"
      formTitle="Create New Event"
    />
  );
}
