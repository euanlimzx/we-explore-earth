import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function EventsPage() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Events Management</Text>
      
      <TouchableOpacity
        style={{
          backgroundColor: "#007AFF",
          padding: 15,
          borderRadius: 8,
          minWidth: 200,
          alignItems: "center",
        }}
        onPress={() => router.push("/(admin)/events/create" as any)}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Create New Event</Text>
      </TouchableOpacity>
    </View>
  );
}
