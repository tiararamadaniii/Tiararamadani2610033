
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { authStyles } from "../styles/authStyles";
import { api } from "../services/api";

export default function RegisterScreen() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [focusedField, setFocusedField] = useState<
    "nama" | "email" | "password" | "confirm" | null
  >(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setErrorMessage("");
    setSuccessMessage("");

    // Validasi 1: Semua kolom wajib diisi
    if (
      !nama.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert(
        "Pendaftaran Gagal",
        "Semua kolom formulir wajib diisi."
      );
      return;
    }

    // Validasi 2: Password minimal 6 karakter
    if (password.length < 6) {
      Alert.alert(
        "Kata Sandi Lemah",
        "Kata sandi minimal terdiri dari 6 karakter."
      );
      return;
    }

    // Validasi 3: Konfirmasi password harus sama
    if (password !== confirmPassword) {
      Alert.alert(
        "Tidak Cocok",
        "Konfirmasi kata sandi tidak sama."
      );
      return;
    }

    try {
      setIsLoading(true);

      // Mengirim data registrasi ke Laravel API
      const response = await fetch(api.register, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nama.trim(),
          email: email.trim().toLowerCase(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const firstError = Object.values(data.errors)[0] as string[];
          setErrorMessage(firstError[0]);
        } else {
          setErrorMessage(data.message || "Registrasi gagal.");
        }
        return;
      }

      // Pesan ketika registrasi berhasil
      setSuccessMessage(
        `Pendaftaran berhasil! Akun atas nama ${nama.trim()} berhasil dibuat. Silakan masuk melalui halaman Login.`
      );

      setPassword("");
      setConfirmPassword("");

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
          {/* Tombol Kembali Kustom */}
          <TouchableOpacity
            style={authStyles.topBackButton}
            activeOpacity={0.6}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back"
              size={20}
              color="#0F172A"
            />
          </TouchableOpacity>

          {/* Header */}
          <View style={authStyles.headerArea}>
            <View style={authStyles.logoBadge}>
              <Ionicons
                name="person-add"
                size={28}
                color="#2563EB"
              />
            </View>

            <Text style={authStyles.title}>
              Buat Akun Baru
            </Text>

            <Text style={authStyles.subtitle}>
              Lengkapi data diri Anda untuk mendaftarkan akun baru
            </Text>
          </View>

          <View style={authStyles.card}>
            {/* Nama Lengkap */}
            <View style={authStyles.formGroup}>
              <Text style={authStyles.label}>
                Nama Lengkap
              </Text>

              <View
                style={[
                  authStyles.inputWrapper,
                  focusedField === "nama" &&
                    authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={
                    focusedField === "nama" ? "#2563EB" : "#64748B"
                  }
                  style={authStyles.inputIcon}
                />

                <TextInput
                  style={authStyles.input}
                  placeholder="Contoh: Muhammad Rizki"
                  placeholderTextColor="#94A3B8"
                  value={nama}
                  onChangeText={(value) => {
                    setNama(value);
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  onFocus={() => setFocusedField("nama")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* Email */}
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
                    setSuccessMessage("");
                  }}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            {/* Password */}
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
                  placeholder="Minimal 6 karakter"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  value={password}
                  onChangeText={(value) => {
                    setPassword(value);
                    setErrorMessage("");
                    setSuccessMessage("");
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

              <Text style={authStyles.helperText}>
                Gunakan kombinasi huruf dan angka.
              </Text>
            </View>

            {/* Konfirmasi Password */}
            <View style={authStyles.formGroup}>
              <Text style={authStyles.label}>
                Konfirmasi Kata Sandi
              </Text>

              <View
                style={[
                  authStyles.inputWrapper,
                  focusedField === "confirm" &&
                    authStyles.inputWrapperFocused,
                ]}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color={
                    focusedField === "confirm" ? "#2563EB" : "#64748B"
                  }
                  style={authStyles.inputIcon}
                />

                <TextInput
                  style={authStyles.input}
                  placeholder="Ulangi kata sandi"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showConfirm}
                  autoCapitalize="none"
                  value={confirmPassword}
                  onChangeText={(value) => {
                    setConfirmPassword(value);
                    setErrorMessage("");
                    setSuccessMessage("");
                  }}
                  onFocus={() => setFocusedField("confirm")}
                  onBlur={() => setFocusedField(null)}
                />

                <TouchableOpacity
                  style={authStyles.eyeButton}
                  activeOpacity={0.6}
                  onPress={() => setShowConfirm(!showConfirm)}
                >
                  <Ionicons
                    name={
                      showConfirm
                        ? "eye-off-outline"
                        : "eye-outline"
                    }
                    size={20}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Pesan Validasi dari Laravel */}
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

            {/* Pesan Berhasil */}
            {successMessage !== "" && (
              <View style={{ marginBottom: 14 }}>
                <Text
                  style={{
                    color: "#16A34A",
                    fontSize: 13,
                    textAlign: "center",
                    lineHeight: 20,
                  }}
                >
                  {successMessage}
                </Text>

                <TouchableOpacity
                  style={[
                    authStyles.primaryButton,
                    { marginTop: 12 },
                  ]}
                  activeOpacity={0.85}
                  onPress={() => router.back()}
                >
                  <Text style={authStyles.primaryButtonText}>
                    Ke Halaman Login
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>
            )}

            {/* Tombol Daftar */}
            {successMessage === "" && (
              <TouchableOpacity
                style={authStyles.primaryButton}
                activeOpacity={0.85}
                onPress={handleRegister}
                disabled={isLoading}
              >
                <Text style={authStyles.primaryButtonText}>
                  {isLoading ? "Memproses..." : "Daftar Akun"}
                </Text>

                <Ionicons
                  name="checkmark"
                  size={19}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            )}

            {/* Footer */}
            <View
              style={[
                authStyles.footerRow,
                { marginTop: 18 },
              ]}
            >
              <Text style={authStyles.footerText}>
                Sudah memiliki akun?
              </Text>

              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => router.back()}
              >
                <Text style={authStyles.footerLink}>
                  Masuk di sini
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
