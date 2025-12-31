import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTodoStore } from "../store/useTodoStore";
import AppBar from "../components/AppBar";

export default function TodoDetailsScreen({ route, navigation }) {
  const { id, title, priority } = route.params;
  const { removeTodo } = useTodoStore();
  
  const handleDelete = () => {
    removeTodo(id);
    navigation.goBack();
  };

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
        return "Non définie";
    }
  };

  const priorityColor = priority ? getPriorityColor(priority) : "#6c757d";
  const priorityLabel = priority ? getPriorityLabel(priority) : "Non définie";

  return (
    <View style={styles.container}>
      <AppBar title="Détails de la tâche" />
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>Tâche</Text>
          <Text style={styles.title}>{title}</Text>
          {priority && (
            <View style={styles.prioritySection}>
              <Text style={styles.label}>Priorité</Text>
              <View style={[styles.priorityBadge, { backgroundColor: priorityColor }]}>
                <Text style={styles.priorityText}>{priorityLabel}</Text>
              </View>
            </View>
          )}
        </View>
        
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          activeOpacity={0.8}
        >
          <Text style={styles.deleteButtonText}>Supprimer cette tâche</Text>
        </TouchableOpacity>
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
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    color: "#333",
    fontWeight: "600",
    marginBottom: 20,
  },
  prioritySection: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  priorityBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 8,
  },
  priorityText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#dc3545",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
