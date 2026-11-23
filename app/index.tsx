
import { getAuthSession } from "../services/authService";
import { authStyles } from "../styles/authStyles";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    getAuthSession()
      .then((session) => {
        setHasSession(Boolean(session?.token));
      })
      .finally(() => {
        setChecking(false);
      });
  }, []);

  if (checking) {
    return (
      <View style={authStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return <Redirect href={hasSession ? "/home" : "/login"} />;
}
