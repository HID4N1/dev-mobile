import { useEffect, useState, useContext } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { initDB } from "./services/database";
import { ThemeProvider, ThemeContext } from "./context/ThemeContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import TodoTabsScreen from "./screens/TodoTabsScreen";

function MainApp() {
  const { theme } = useContext(ThemeContext);
  const { user, loading: authLoading } = useContext(AuthContext);

  if (authLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer, theme === "dark" ? styles.dark : styles.light]}>
        <ActivityIndicator size="large" color={theme === "dark" ? "#4f46e5" : "#4f46e5"} />
      </View>
    );
  }

  return (
    <View
      style={[styles.container, theme === "dark" ? styles.dark : styles.light]}
    >
      {user ? <TodoTabsScreen /> : <LoginScreen />}
    </View>
  );
}

export default function App() {
  const [dbReady, setDbReady] = useState(false);
  
  useEffect(() => {
    const prepareDb = async () => {
      await initDB(); // attendre SQLite
      setDbReady(true); // OK pour afficher l'app
    };
    prepareDb();
  }, []);

  if (!dbReady) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  light: {
    backgroundColor: "#ffffff",
  },
  dark: {
    backgroundColor: "#121212",
  },
});
