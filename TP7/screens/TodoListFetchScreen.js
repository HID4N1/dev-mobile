import { FlatList, Text, ActivityIndicator, Button, View, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState, useContext } from "react";
import { fetchTodosFetch } from "../services/api";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

export default function TodoListFetchScreen() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    fetchTodosFetch()
      .then(setTodos)
      .catch(() => setError("Impossible de charger les tâches"))
      .finally(() => setLoading(false));
  }, []);

  const isDark = theme === "dark";
  const styles = getStyles(isDark);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={isDark ? "#4f46e5" : "#4f46e5"} />
        <Text style={styles.loadingText}>Chargement des tâches...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerButtons}>
          <Button
            title={`Passer en mode ${theme === "light" ? "dark" : "light"}`}
            onPress={toggleTheme}
          />
          <Button
            title="Déconnexion"
            onPress={logout}
            color="#dc2626"
          />
        </View>
        {user && (
          <Text style={styles.welcomeText}>
            Bienvenue, {user.name} 👋
          </Text>
        )}
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <View style={styles.todoContent}>
              <View style={[
                styles.statusIndicator,
                item.completed && styles.statusCompleted
              ]} />
              <Text style={styles.todoText}>
                {item.title}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          !error && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Aucune tâche disponible</Text>
            </View>
          )
        }
      />
    </View>
  );
}

const getStyles = (isDark) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? "#121212" : "#ffffff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: isDark ? "#121212" : "#ffffff",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: isDark ? "#9ca3af" : "#6b7280",
  },
  header: {
    padding: 16,
    paddingTop: 20,
  },
  headerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
    color: isDark ? "#f9fafb" : "#111827",
    marginTop: 8,
  },
  errorContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: isDark ? "#7f1d1d" : "#fee2e2",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: isDark ? "#991b1b" : "#fecaca",
  },
  errorText: {
    color: isDark ? "#fca5a5" : "#dc2626",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
  list: {
    padding: 16,
    paddingTop: 0,
  },
  todoItem: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: isDark ? "#1f2937" : "#f9fafb",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: isDark ? "#374151" : "#e5e7eb",
  },
  todoContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: isDark ? "#6b7280" : "#d1d5db",
    marginRight: 12,
  },
  statusCompleted: {
    backgroundColor: "#10b981",
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: isDark ? "#f9fafb" : "#111827",
    lineHeight: 22,
  },
  emptyContainer: {
    padding: 32,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: isDark ? "#9ca3af" : "#6b7280",
  },
});
