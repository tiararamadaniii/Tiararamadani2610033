import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Kartu Mahasiswa Digital" }}
      />

      <Stack.Screen
        name="FormMahasiswa"
        options={{ title: "Praktikum Modul 4" }}
      />

      <Stack.Screen
        name="Kalkulator"
        options={{ title: "Kalkulator Modul 4" }}
      />

      <Stack.Screen
        name="belajarFlatList"
        options={{ title: "Pendataan Mahasiswa" }}
      />
    </Stack>
  );
}