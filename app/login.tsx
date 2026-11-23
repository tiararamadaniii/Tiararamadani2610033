import { loginApi, saveAuthSession } from "../services/authService";
import { authStyles } from "../styles/authStyles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FeedbackType = "error" | "success";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("error");
  const [focusedField, setFocusedField] = useState<
    "email" | "password" | null
  >(null);

  const showMessage = (message: string, type: FeedbackType = "error") => {
    setFeedback(message);
    setFeedbackType(type);
  };

  const handleLogin = async () => {
    setFeedback("");

    if (!email.trim() || !password.trim()) {
      showMessage("Silakan masukkan email dan password Anda.");
      return;
    }

    setLoading(true);

    try {
      const result = await loginApi({
        email: email.trim(),
        password,
      });

      await saveAuthSession(result.user, result.token);
      showMessage("Login berhasil. Mengarahkan ke Dashboard...", "success");
      router.replace("/home");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Terjadi kesalahan saat masuk ke akun.";

      showMessage(message);
    } finally {
      setLoading(false);
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

            <Text style={authStyles.title}>Selamat Datang</Text>

            <Text style={authStyles.subtitle}>
              Masuk ke akun Anda untuk mengakses portal praktikum Mobile 2
            </Text>
          </View>

          <View style={authStyles.card}>
            {/* Input Email */}
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
                  color={focusedField === "email" ? "#2563EB" : "#64748B"}
                  style={authStyles.inputIcon}
                />

                <TextInput
                  style={authStyles.input}
                  placeholder="nama@kampus.ac.id"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  returnKeyType="next"
                />
              </View>
            </View>

            {/* Input Password */}
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
                  color={focusedField === "password" ? "#2563EB" : "#64748B"}
                  style={authStyles.inputIcon}
                />

                <TextInput
                  style={authStyles.input}
                  placeholder="Masukkan kata sandi"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  returnKeyType="go"
                  onSubmitEditing={handleLogin}
                />

                <TouchableOpacity
                  style={authStyles.eyeButton}
                  disabled={loading}
                  onPress={() => setShowPassword(!showPassword)}
                  accessibilityRole="button"
                  accessibilityLabel={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#64748B"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Tombol Login */}
            <TouchableOpacity
              style={[
                authStyles.primaryButton,
                loading && authStyles.primaryButtonDisabled,
              ]}
              activeOpacity={0.85}
              disabled={loading}
              onPress={handleLogin}
              accessibilityRole="button"
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <>
                  <Text style={authStyles.primaryButtonText}>
                    Masuk Sekarang
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color="#FFFFFF"
                  />
                </>
              )}
            </TouchableOpacity>

            {/* Pesan validasi dan hasil login */}
            {feedback !== "" && (
              <View
                accessibilityRole="alert"
                style={{
                  marginTop: 14,
                  paddingVertical: 11,
                  paddingHorizontal: 13,
                  borderRadius: 9,
                  backgroundColor:
                    feedbackType === "success" ? "#DCFCE7" : "#FEE2E2",
                  borderWidth: 1,
                  borderColor:
                    feedbackType === "success" ? "#86EFAC" : "#FCA5A5",
                }}
              >
                <Text
                  style={{
                    color: feedbackType === "success" ? "#166534" : "#B91C1C",
                    fontSize: 13,
                    lineHeight: 19,
                    textAlign: "center",
                  }}
                >
                  {feedback}
                </Text>
              </View>
            )}

            {/* Divider */}
            <View style={authStyles.dividerRow}>
              <View style={authStyles.dividerLine} />
              <Text style={authStyles.dividerText}>atau</Text>
              <View style={authStyles.dividerLine} />
            </View>

            {/* Link Register */}
            <View style={authStyles.footerRow}>
              <Text style={authStyles.footerText}>
                Belum punya akun?
              </Text>

              <TouchableOpacity
                disabled={loading}
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
