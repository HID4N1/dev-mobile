import { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";

export default function TodoListScreen({ navigation }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
        return "#ff6b6b";
      case "medium":
        return "#ffa94d";
      case "low":
        return "#51cf66";
      default:
        return "#868e96";
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4dabf7" />
        <Text style={styles.loadingText}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes tâches</Text>
      <FlatList
        data={todos}
        keyExtractor={(i) => i.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.todoItem}
            onPress={() =>
              navigation.navigate("Détails", { id: item.id, title: item.title })
            }
            activeOpacity={0.7}
          >
            <View style={styles.todoContent}>
              <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(item.priority) }]} />
              <Text style={styles.todoTitle}>{item.title}</Text>
            </View>
            <Text style={styles.priorityText}>{item.priority}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    fontSize: 16,
    color: "#495057",
    marginTop: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 20,
    marginTop: 8,
  },
  listContainer: {
    paddingBottom: 16,
  },
  todoItem: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  todoContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  priorityIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  todoTitle: {
    fontSize: 16,
    color: "#212529",
    flex: 1,
    lineHeight: 22,
  },
  priorityText: {
    fontSize: 12,
    color: "#868e96",
    textTransform: "uppercase",
    fontWeight: "500",
    marginLeft: 8,
  },
});
