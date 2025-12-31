import { View, Text, FlatList, Button, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState, useContext } from "react";
import {
  loadTodos,
  addTodoOffline,
  updateTodoOffline,
  deleteTodoOffline,
} from "../services/database";
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

export default function TodoListOfflineScreen() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  
  const refreshTodos = () => {
    setTodos(loadTodos());
  };
  
  const handleAddOrUpdate = () => {
    if (!title.trim()) return;
    if (editingId) {
      updateTodoOffline(editingId, title);
      setEditingId(null);
    } else {
      addTodoOffline(title);
    }
    setTitle("");
    refreshTodos();
  };

  const handleDelete = (id) => {
    deleteTodoOffline(id);
    if (editingId === id) {
      setEditingId(null);
      setTitle("");
    }
    refreshTodos();
  };

  useEffect(() => {
    refreshTodos();
  }, []);

  const isDark = theme === "dark";
  const styles = getStyles(isDark);

  return (
    <View style={styles.container}>
      {/* Theme toggle and Logout */}
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

      {/* Add / Update */}
      <View style={styles.form}>
        <TextInput
          placeholder="Tâche offline"
          placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TouchableOpacity
          style={[styles.button, !title.trim() && styles.buttonDisabled]}
          onPress={handleAddOrUpdate}
          disabled={!title.trim()}
          activeOpacity={0.7}
        >
          <Text style={[styles.buttonText, !title.trim() && styles.buttonTextDisabled]}>
            {editingId ? "✏️ Mettre à jour" : "➕ Ajouter hors ligne"}
          </Text>
        </TouchableOpacity>
      </View>

      {todos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Aucune tâche disponible hors ligne
          </Text>
        </View>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <Text style={styles.todoText} numberOfLines={2}>
                {item.title}
              </Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => {
                    setTitle(item.title);
                    setEditingId(item.id);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.editButtonText}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.deleteButtonText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const getStyles = (isDark) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? "#121212" : "#ffffff",
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
  form: {
    padding: 16,
    paddingTop: 0,
  },
  input: {
    borderWidth: 2,
    borderColor: isDark ? "#374151" : "#e5e7eb",
    backgroundColor: isDark ? "#1f2937" : "#ffffff",
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
    fontSize: 16,
    color: isDark ? "#f9fafb" : "#111827",
  },
  button: {
    backgroundColor: isDark ? "#4f46e5" : "#4f46e5",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#4f46e5",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: isDark ? "#374151" : "#d1d5db",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextDisabled: {
    color: isDark ? "#6b7280" : "#9ca3af",
  },
  list: {
    padding: 16,
    paddingTop: 0,
  },
  todoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
    backgroundColor: isDark ? "#1f2937" : "#f9fafb",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: isDark ? "#374151" : "#e5e7eb",
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: isDark ? "#f9fafb" : "#111827",
    marginRight: 12,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: isDark ? "#374151" : "#e5e7eb",
  },
  editButtonText: {
    fontSize: 18,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: isDark ? "#7f1d1d" : "#fee2e2",
  },
  deleteButtonText: {
    fontSize: 18,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: isDark ? "#9ca3af" : "#6b7280",
  },
});
