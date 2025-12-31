import { useState, useContext, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen() {
  const [name, setName] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { login } = useContext(AuthContext);
  const inputRef = useRef(null);
  
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.emoji}>👋</Text>
          <Text style={styles.title}>Connexion</Text>
          <Text style={styles.subtitle}>Entrez votre nom pour continuer</Text>
        </View>
        
        <View style={styles.form}>
          <TextInput
            ref={inputRef}
            style={[
              styles.input,
              isFocused && styles.inputFocused
            ]}
            placeholder="Votre nom"
            placeholderTextColor="#9ca3af"
            value={name}
            onChangeText={setName}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoCapitalize="words"
            returnKeyType="done"
            onSubmitEditing={() => name && login(name)}
          />
          
          <TouchableOpacity
            style={[
              styles.button,
              !name && styles.buttonDisabled
            ]}
            onPress={() => login(name)}
            disabled={!name}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.buttonText,
              !name && styles.buttonTextDisabled
            ]}>
              Se connecter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    padding: 24,
  },
  content: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },
  header: {
    marginBottom: 40,
    alignItems: "center",
  },
  emoji: {
    fontSize: 72,
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 17,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 24,
  },
  form: {
    width: "100%",
  },
  input: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    backgroundColor: "#ffffff",
    marginBottom: 24,
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 12,
    fontSize: 17,
    color: "#111827",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputFocused: {
    borderColor: "#4f46e5",
    shadowColor: "#4f46e5",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  button: {
    backgroundColor: "#4f46e5",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#4f46e5",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: "#d1d5db",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  buttonTextDisabled: {
    color: "#9ca3af",
  },
});

