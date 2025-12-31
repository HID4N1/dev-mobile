import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useTodoStore } from "../store/useTodoStore";
import AppBar from "../components/AppBar";

export default function TodoListScreen({ navigation }) {
  const { todos, addTodo } = useTodoStore();
  
  useEffect(() => {
    // Only add todos if the list is empty
    if (todos.length === 0) {
      addTodo({ id: 1, title: "Faire les courses" });
      addTodo({ id: 2, title: "Sortir le chien" });
      addTodo({ id: 3, title: "Coder une app RN" });
    }
  }, []);

  const renderTodoItem = ({ item }) => (
    <TouchableOpacity
      style={styles.todoCard}
      onPress={() => navigation.navigate("Détails", item)}
      activeOpacity={0.7}
    >
      <View style={styles.todoContent}>
        <View style={styles.checkbox} />
        <Text style={styles.todoTitle}>{item.title}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <AppBar title="Mes tâches" />
      <View style={styles.content}>
        {todos.length === 0 ? (
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
  todoTitle: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  arrow: {
    fontSize: 24,
    color: "#6200ee",
    fontWeight: "300",
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
