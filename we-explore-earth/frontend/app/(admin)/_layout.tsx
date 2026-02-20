import { Tabs, useRouter } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const NEW_EVENT_HREF = "/(admin)/events/new";

function NewEventTabButton(
  props: React.ComponentProps<typeof HapticTab>,
) {
  const router = useRouter();
  return (
    <HapticTab
      {...props}
      onPress={() => {
        router.replace(NEW_EVENT_HREF as any);
      }}
    />
  );
}

export default function AdminLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="events/[id]"
        options={{
          title: "New Event",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="calendar" color={color} />
          ),
          tabBarButton: NewEventTabButton,
        }}
      />
    </Tabs>
  );
}
