import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { styles } from "./styles";
import type { Event } from "@/types/event";

export default function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timeStart, setTimeStart] = useState(new Date());
  const [timeEnd, setTimeEnd] = useState(new Date());
  const [location, setLocation] = useState("");

  const handleTimeStartChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (selectedDate) {
      setTimeStart(selectedDate);
    }
  };

  const handleTimeEndChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (selectedDate) {
      setTimeEnd(selectedDate);
    }
  };

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
    <View style={styles.container}>
      <Text style={styles.title}>Create New Event</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Start Time</Text>
      <DateTimePicker
        value={timeStart}
        mode="datetime"
        display="default"
        onChange={handleTimeStartChange}
      />

      <Text style={styles.label}>End Date</Text>
      <DateTimePicker
        value={timeEnd}
        mode="datetime"
        display="default"
        onChange={handleTimeEndChange}
      />

      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>
    </View>
  );
}
