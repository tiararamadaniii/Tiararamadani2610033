
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { homeStyles } from "../styles/homeStyles";
import { api } from "../services/api";
import {
  getToken,
  removeToken,
} from "../services/authStorage";

type UserData = {
  id: number;
  name: string;
  email: string;
};

export default function HomeScreen() {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isActive = true;

    const getUser = async () => {
      try {
        // Ambil token dari penyimpanan
        const token = await getToken();

        if (!token) {
          router.replace("/login");
          return;
        }

        // Verifikasi token ke Laravel API
        const response = await fetch(api.user, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        // Jika token tidak valid atau kedaluwarsa
        if (response.status === 401) {
          await removeToken();

          if (isActive) {
            router.replace("/login");
          }

          return;
        }

        if (!response.ok) {
          if (isActive) {
            setErrorMessage(
              data.message || "Gagal mengambil data pengguna."
            );
          }
          return;
        }

        if (isActive) {
          setUser(data);
        }
      } catch {
        if (isActive) {
          setErrorMessage(
            "Tidak dapat terhubung ke server Laravel."
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    getUser();

    return () => {
      isActive = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Hapus token dari penyimpanan
      await removeToken();

      // Kembali ke halaman Login
      router.replace("/login");
    } catch {
      setErrorMessage("Gagal keluar dari akun.");
    }
  };

  return (
    <SafeAreaView
      style={homeStyles.safeArea}
      edges={["bottom"]}
    >
      <View style={homeStyles.container}>
        <View style={homeStyles.contentArea}>
          {/* Kartu Sambutan */}
          <View style={homeStyles.welcomeCard}>
            <View style={homeStyles.statusBadge}>
              <Ionicons
                name={
                  user ? "checkmark-circle" : "alert-circle"
                }
                size={15}
                color={user ? "#059669" : "#DC2626"}
              />

              <Text style={homeStyles.statusBadgeText}>
                {isLoading
                  ? "Memuat Data..."
                  : user
                    ? "Berhasil Masuk (Laravel API)"
                    : "Gagal Memuat Data"}
              </Text>
            </View>

            <Text style={homeStyles.greetingTitle}>
              Halo, Selamat Datang di Aplikasi Saya!
            </Text>

            {isLoading ? (
              <ActivityIndicator
                size="small"
                color="#2563EB"
              />
            ) : user ? (
              <>
                <Text style={homeStyles.greetingEmail}>
                  {user.name}
                </Text>

                <Text style={homeStyles.greetingEmail}>
                  {user.email}
                </Text>

                <Text style={homeStyles.greetingDesc}>
                  Anda berhasil masuk menggunakan autentikasi
                  Laravel Sanctum. Data akun ditampilkan langsung
                  dari database Laravel.
                </Text>
              </>
            ) : (
              <Text style={homeStyles.greetingDesc}>
                {errorMessage}
              </Text>
            )}
          </View>

          {/* Informasi Integrasi REST API */}
          <View style={homeStyles.infoCard}>
            <Text style={homeStyles.infoTitle}>
              Status Integrasi REST API
            </Text>

            <Text style={homeStyles.infoItem}>
              {"• Login terhubung ke Laravel 13.\n"}
              {"• Register menyimpan data ke database.\n"}
              {"• Autentikasi menggunakan Laravel Sanctum.\n"}
              {"• Data pengguna diambil melalui endpoint API."}
            </Text>
          </View>
        </View>

        {/* Tombol Keluar */}
        <TouchableOpacity
          style={homeStyles.logoutButton}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <Ionicons
            name="log-out-outline"
            size={20}
            color="#DC2626"
          />

          <Text style={homeStyles.logoutButtonText}>
            Keluar dari Akun
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
