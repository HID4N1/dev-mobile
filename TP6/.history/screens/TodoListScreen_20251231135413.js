import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useTodoStore } from "../store/useTodoStore";
import AppBar from "../components/AppBar";

export default function TodoListScreen({ navigation }) {
  const { todos, loading, setTodos, setLoading } = useTodoStore();
  
  useEffect(() => {
    console.log("Chargement des tâches...");
    setTimeout(() => {
      setTodos([
        { id: 1, title: "Code review for authentication module", priority: "high" },
        { id: 2, title: "Update API documentation for v2.0", priority: "medium" },
        { id: 3, title: "Fix bug in payment processing flow", priority: "high" },
        { id: 4, title: "Implement unit tests for user service", priority: "medium" },
        { id: 5, title: "Deploy staging environment updates", priority: "high" },
        { id: 6, title: "Refactor database queries for performance", priority: "low" },
        { id: 7, title: "Setup CI/CD pipeline for new microservice", priority: "medium" },
        { id: 8, title: "Review security audit findings", priority: "high" },
        { id: 9, title: "Optimize Docker container sizes", priority: "low" },
        { id: 10, title: "Migrate legacy endpoints to GraphQL", priority: "medium" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "#dc3545";
      case "medium":
        return "#ffc107";
      case "low":
        return "#28a745";
      default:
        return "#6c757d";
    }
  };

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "high":
        return "Haute";
      case "medium":
        return "Moyenne";
      case "low":
        return "Basse";
      default:
        return "";
    }
  };

  const renderTodoItem = ({ item }) => {
    const priorityColor = getPriorityColor(item.priority);
    const priorityLabel = getPriorityLabel(item.priority);
    
    return (
      <TouchableOpacity
        style={styles.todoCard}
        onPress={() => navigation.navigate("Détails", item)}
        activeOpacity={0.7}
      >
        <View style={styles.todoContent}>
          <View style={[styles.checkbox, { borderColor: priorityColor }]} />
          <View style={styles.todoTextContainer}>
            <Text style={styles.todoTitle}>{item.title}</Text>
            {item.priority && (
              <View style={[styles.priorityBadge, { backgroundColor: priorityColor }]}>
                <Text style={styles.priorityText}>{priorityLabel}</Text>
              </View>
            )}
          </View>
        </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <AppBar title="Mes tâches" />
      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingState}>
            <ActivityIndicator size="large" color="#6200ee" />
            <Text style={styles.loadingText}>Chargement des tâches...</Text>
          </View>
        ) : todos.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Aucune tâche pour le moment</Text>
          </View>
        ) : (
          <FlatList
            data={todos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderTodoItem}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  todoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  todoContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#6200ee",
    marginRight: 12,
  },
  todoTextContainer: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  priorityBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  arrow: {
    fontSize: 24,
    color: "#6200ee",
    fontWeight: "300",
  },
  loadingState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
  },
});
