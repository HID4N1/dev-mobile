import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import TodoListFetchScreen from "./TodoListFetchScreen";
import TodoListOfflineScreen from "./TodoListOfflineScreen";

export default function TodoTabsScreen() {
  const [activeTab, setActiveTab] = useState("fetch"); // "fetch" or "offline"
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const styles = getStyles(isDark);

  return (
    <View style={styles.container}>
      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "fetch" && styles.tabActive]}
          onPress={() => setActiveTab("fetch")}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === "fetch" && styles.tabTextActive]}>
            🌐 API
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "offline" && styles.tabActive]}
          onPress={() => setActiveTab("offline")}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === "offline" && styles.tabTextActive]}>
            💾 Offline
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.content}>
        {activeTab === "fetch" ? <TodoListFetchScreen /> : <TodoListOfflineScreen />}
      </View>
    </View>
  );
}

const getStyles = (isDark) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? "#121212" : "#ffffff",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: isDark ? "#1f2937" : "#f9fafb",
    borderBottomWidth: 1,
    borderBottomColor: isDark ? "#374151" : "#e5e7eb",
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    marginHorizontal: 4,
  },
  tabActive: {
    borderBottomColor: "#4f46e5",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
    color: isDark ? "#9ca3af" : "#6b7280",
  },
  tabTextActive: {
    color: "#4f46e5",
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
});

