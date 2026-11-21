
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Layar pembuka & autentikasi menggunakan tampilan full-screen modern */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />

      {/* Grup Bottom Navigation (5 Tab) setelah berhasil login */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}
