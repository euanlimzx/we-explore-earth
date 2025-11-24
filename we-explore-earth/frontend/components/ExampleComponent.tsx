import React, { useState } from "react";
import { View, Text, Button } from "react-native";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function ExampleComponent() {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    const res = await fetch("http://localhost:3000/users/07os2XPWanrLWrq1OsDs"); // Replace with ID
    const data: User = await res.json();
    setUser(data);
  };

  return (
    <View style={{ padding: 16 }}>
      <Button title="Fetch User" onPress={fetchUser} />
      {user && (
        <View style={{ marginTop: 16 }}>
          <Text>ID: {user.id}</Text>
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
        </View>
      )}
    </View>
  );
}
