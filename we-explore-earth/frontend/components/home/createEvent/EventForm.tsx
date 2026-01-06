import { View, Text, TextInput, TouchableOpacity } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { styles } from "./styles";

interface EventFormProps {
  title: string;
  setTitle: (text: string) => void;
  description: string;
  setDescription: (text: string) => void;
  location: string;
  setLocation: (text: string) => void;
  timeStart: Date;
  setTimeStart: (date: Date) => void;
  timeEnd: Date;
  setTimeEnd: (date: Date) => void;
  onSubmit: () => void;
  submitButtonText: string;
  formTitle: string;
}

export default function EventForm({
  title,
  setTitle,
  description,
  setDescription,
  location,
  setLocation,
  timeStart,
  setTimeStart,
  timeEnd,
  setTimeEnd,
  onSubmit,
  submitButtonText,
  formTitle,
}: EventFormProps) {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{formTitle}</Text>

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

      <Text style={styles.label}>End Time</Text>
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

      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.buttonText}>{submitButtonText}</Text>
      </TouchableOpacity>
    </View>
  );
}
