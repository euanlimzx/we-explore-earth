import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
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
  dateStart: Date;
  setDateStart: (date: Date) => void;
  timeStart: Date;
  setTimeStart: (date: Date) => void;
  dateEnd: Date;
  setDateEnd: (date: Date) => void;
  timeEnd: Date;
  setTimeEnd: (date: Date) => void;
  price: string;
  setPrice: (text: string) => void;
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
  dateStart,
  setDateStart,
  timeStart,
  setTimeStart,
  dateEnd,
  setDateEnd,
  timeEnd,
  setTimeEnd,
  price,
  setPrice,
  onSubmit,
  submitButtonText,
  formTitle,
}: EventFormProps) {
  const [showDateStartPicker, setShowDateStartPicker] = useState(false);
  const [showTimeStartPicker, setShowTimeStartPicker] = useState(false);
  const [showDateEndPicker, setShowDateEndPicker] = useState(false);
  const [showTimeEndPicker, setShowTimeEndPicker] = useState(false);

  const isAndroid = Platform.OS === "android";

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString();
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleDateStartChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (isAndroid) {
      setShowDateStartPicker(false);
      if (event.type === "dismissed") {
        return;
      }
    }
    if (selectedDate) {
      setDateStart(selectedDate);
    }
  };

  const handleTimeStartChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (isAndroid) {
      setShowTimeStartPicker(false);
      if (event.type === "dismissed") {
        return;
      }
    }
    if (selectedDate) {
      setTimeStart(selectedDate);
    }
  };

  const handleDateEndChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (isAndroid) {
      setShowDateEndPicker(false);
      if (event.type === "dismissed") {
        return;
      }
    }
    if (selectedDate) {
      setDateEnd(selectedDate);
    }
  };

  const handleTimeEndChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (isAndroid) {
      setShowTimeEndPicker(false);
      if (event.type === "dismissed") {
        return;
      }
    }
    if (selectedDate) {
      setTimeEnd(selectedDate);
    }
  };

  const handlePriceChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setPrice(numericValue);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
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

        <Text style={styles.label}>Start Date</Text>
        {isAndroid ? (
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDateStartPicker(true)}
          >
            <Text>{formatDate(dateStart)}</Text>
          </TouchableOpacity>
        ) : null}
        {(isAndroid && showDateStartPicker) || !isAndroid ? (
          <DateTimePicker
            value={dateStart}
            mode="date"
            display="default"
            onChange={handleDateStartChange}
          />
        ) : null}

        <Text style={styles.label}>Start Time</Text>
        {isAndroid ? (
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowTimeStartPicker(true)}
          >
            <Text>{formatTime(timeStart)}</Text>
          </TouchableOpacity>
        ) : null}
        {(isAndroid && showTimeStartPicker) || !isAndroid ? (
          <DateTimePicker
            value={timeStart}
            mode="time"
            display="default"
            onChange={handleTimeStartChange}
          />
        ) : null}

        <Text style={styles.label}>End Date</Text>
        {isAndroid ? (
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDateEndPicker(true)}
          >
            <Text>{formatDate(dateEnd)}</Text>
          </TouchableOpacity>
        ) : null}
        {(isAndroid && showDateEndPicker) || !isAndroid ? (
          <DateTimePicker
            value={dateEnd}
            mode="date"
            display="default"
            onChange={handleDateEndChange}
          />
        ) : null}

        <Text style={styles.label}>End Time</Text>
        {isAndroid ? (
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowTimeEndPicker(true)}
          >
            <Text>{formatTime(timeEnd)}</Text>
          </TouchableOpacity>
        ) : null}
        {(isAndroid && showTimeEndPicker) || !isAndroid ? (
          <DateTimePicker
            value={timeEnd}
            mode="time"
            display="default"
            onChange={handleTimeEndChange}
          />
        ) : null}

        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
    
        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          onChangeText={handlePriceChange}
          keyboardType="number-pad" 
        />        

        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.buttonText}>{submitButtonText}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
