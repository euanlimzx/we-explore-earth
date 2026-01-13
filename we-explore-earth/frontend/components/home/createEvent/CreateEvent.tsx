import { useState } from "react";
import { Alert } from "react-native";
import EventForm from "./EventForm";

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
            price
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
      const now = new Date();
      setDateStart(now);
      setTimeStart(now);
      setDateEnd(now);
      setTimeEnd(now);
      setPrice("")
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
      dateStart={dateStart}
      setDateStart={setDateStart}
      timeStart={timeStart}
      setTimeStart={setTimeStart}
      dateEnd={dateEnd}
      setDateEnd={setDateEnd}
      timeEnd={timeEnd}
      setTimeEnd={setTimeEnd}
      price = {price}
      setPrice = {setPrice}
      onSubmit={handleSubmit}
      submitButtonText="Create Event"
      formTitle="Create New Event"
    />
  );
}
