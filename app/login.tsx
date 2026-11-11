
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

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<
    "email" | "password" | null
  >(null);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        "Input Belum Lengkap",
        "Silakan masukkan email dan password Anda."
      );
      return;
    }

    // Pada modul berikutnya, bagian ini akan dihubungkan
    // ke Fetch API endpoint POST /api/login pada server Laravel 13.
    router.replace({
      pathname: "/home",
      params: { email: email.trim() },
    });
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

            <Text style={authStyles.title}>Selamat Datang</Text>
            <Text style={authStyles.subtitle}>
              Masuk ke akun Anda untuk mengakses portal praktikum Mobile 2
            </Text>
          </View>

          <View style={authStyles.card}>
            <View style={authStyles.formGroup}>
              <Text style={authStyles.label}>Alamat Email</Text>

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
                  onChangeText={setEmail}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>

            <View style={authStyles.formGroup}>
              <Text style={authStyles.label}>Kata Sandi</Text>

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
                  onChangeText={setPassword}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                />

                <TouchableOpacity
                  style={authStyles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={
                      showPassword ? "eye-off-outline" : "eye-outline"
                    }
                    size={20}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={authStyles.primaryButton}
              activeOpacity={0.85}
              onPress={handleLogin}
            >
              <Text style={authStyles.primaryButtonText}>
                Masuk Sekarang
              </Text>
              <Ionicons
                name="arrow-forward"
                size={18}
                color="#FFFFFF"
              />
            </TouchableOpacity>

            <View style={authStyles.dividerRow}>
              <View style={authStyles.dividerLine} />
              <Text style={authStyles.dividerText}>atau</Text>
              <View style={authStyles.dividerLine} />
            </View>

            <View style={authStyles.footerRow}>
              <Text style={authStyles.footerText}>
                Belum punya akun?
              </Text>
              <TouchableOpacity
                onPress={() => router.push("/register")}
              >
                <Text style={authStyles.footerLink}>
                  Daftar Sekarang
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
