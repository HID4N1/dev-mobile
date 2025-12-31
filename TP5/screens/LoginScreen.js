import { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen() {
  const [name, setName] = useState("");
  const { login } = useContext(AuthContext);
  
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>👋</Text>
        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.subtitle}>Entrez votre nom pour continuer</Text>
        <TextInput
          style={styles.input}
          placeholder="Votre nom"
          placeholderTextColor="#adb5bd"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />
        <TouchableOpacity
          style={[styles.button, !name && styles.buttonDisabled]}
          onPress={() => login(name)}
          disabled={!name}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    padding: 24,
  },
  content: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },
  emoji: {
    fontSize: 64,
    textAlign: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#868e96",
    marginBottom: 32,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#dee2e6",
    backgroundColor: "#ffffff",
    marginBottom: 20,
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    color: "#212529",
  },
  button: {
    backgroundColor: "#4dabf7",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#adb5bd",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
