
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, Link } from "expo-router";
import { authStyles } from "../styles/authStyles";
import { api } from "../services/api";
import { saveToken } from "../services/authStorage";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [focusedField, setFocusedField] = useState<
    "email" | "password" | null
  >(null);

  const handleLogin = async () => {
    setErrorMessage("");

    if (!email.trim() || !password.trim()) {
      setErrorMessage("Silakan masukkan email dan password Anda.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(api.login, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(
          data.message === "The provided credentials are incorrect."
            ? "Email atau kata sandi salah."
            : data.message || "Login gagal."
        );
        return;
      }

      if (!data.access_token) {
        setErrorMessage("Token autentikasi tidak ditemukan.");
        return;
      }

      // Simpan token autentikasi
      await saveToken(data.access_token);

      // Pindah ke halaman Home tanpa mengirim token melalui URL
      router.replace({
        pathname: "/home",
        params: {
          email: data.user.email,
        },
      });
    } catch {
      setErrorMessage(
        "Tidak dapat terhubung ke server. Periksa koneksi jaringan Anda."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={authStyles.safeArea}>
      <KeyboardAvoidingView
        style={authStyles.flexContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={authStyles.headerArea}>
            <View style={authStyles.logoBadge}>
              <Ionicons
                name="shield-checkmark"
                size={30}
                color="#2563EB"
              />
            </View>

            <Text style={authStyles.title}>
              Selamat Datang
            </Text>

            <Text style={authStyles.subtitle}>
              Masuk ke akun Anda untuk mengakses portal praktikum Mobile 2
            </Text>
          </View>

          <View style={authStyles.card}>
            <View style={authStyles.formGroup}>
              <Text style={authStyles.label}>
                Alamat Email
              </Text>

              <View
                style={[
                  authStyles.inputWrapper,
                  focusedField === "email" &&
                    authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={
                    focusedField === "email" ? "#2563EB" : "#64748B"
                  }
                  style={authStyles.inputIcon}
                />

                <TextInput
                  style={authStyles.input}
                  placeholder="nama@kampus.ac.id"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(value) => {
                    setEmail(value);
                    setErrorMessage("");
                  }}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            <View style={authStyles.formGroup}>
              <Text style={authStyles.label}>
                Kata Sandi
              </Text>

              <View
                style={[
                  authStyles.inputWrapper,
                  focusedField === "password" &&
                    authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={
                    focusedField === "password" ? "#2563EB" : "#64748B"
                  }
                  style={authStyles.inputIcon}
                />

                <TextInput
                  style={authStyles.input}
                  placeholder="Masukkan kata sandi"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);
                    setErrorMessage("");
                  }}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />

                <TouchableOpacity
                  style={authStyles.eyeButton}
                  activeOpacity={0.6}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={
                      showPassword
                        ? "eye-off-outline"
                        : "eye-outline"
                    }
                    size={20}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {errorMessage !== "" && (
              <Text
                style={{
                  color: "#DC2626",
                  fontSize: 12,
                  marginBottom: 12,
                  textAlign: "center",
                }}
              >
                {errorMessage}
              </Text>
            )}

            <TouchableOpacity
              style={[
                authStyles.primaryButton,
                isLoading && { opacity: 0.7 },
              ]}
              activeOpacity={0.85}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={authStyles.primaryButtonText}>
                {isLoading ? "Memproses..." : "Masuk Sekarang"}
              </Text>

              <Ionicons
                name="arrow-forward"
                size={18}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            <View style={authStyles.dividerRow}>
              <View style={authStyles.dividerLine} />

              <Text style={authStyles.dividerText}>
                atau
              </Text>

              <View style={authStyles.dividerLine} />
            </View>

            <View style={authStyles.footerRow}>
              <Text style={authStyles.footerText}>
                Belum punya akun?
              </Text>

              <Link href="/register" asChild>
                <Text style={authStyles.footerLink}>
                  Daftar Sekarang
                </Text>
              </Link>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
