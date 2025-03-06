import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Star Wars Search" }} />
      <Stack.Screen
        name="search"
        options={{
          title: "Results",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
