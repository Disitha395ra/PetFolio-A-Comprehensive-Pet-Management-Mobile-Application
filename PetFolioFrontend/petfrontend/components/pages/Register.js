import React, { useState } from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  Alert,
  ScrollView,
  Pressable,
} from "react-native";
import { StyleSheet, Text, TextInput } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import axios from "axios";

export default function Register({ navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    Alert.alert("Button Works", "You clicked Create Account");
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StatusBar barStyle="light-content" backgroundColor="#6C63FF" />
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.content}>
              <Text style={styles.head}>Create Account</Text>
              <Text style={styles.subhead}>
                Join PetFolio and start your pet journey
              </Text>

              <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Username</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Choose a username"
                    placeholderTextColor="#B0B0B0"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    placeholderTextColor="#B0B0B0"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Create a password"
                    placeholderTextColor="#B0B0B0"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm your password"
                    placeholderTextColor="#B0B0B0"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                  />
                </View>

                <Pressable
                  style={styles.registerButton}
                  onPress={handleRegister}
                >
                  <Text style={styles.registerButtonText}>Create Account</Text>
                </Pressable>
              </View>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation?.navigate("Login")}>
                  <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6C63FF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 50,
    minHeight: "100%",
  },
  head: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  subhead: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#F0F0F0",
    marginBottom: 40,
  },
  formContainer: {
    width: "100%",
    maxWidth: 350,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    color: "#333333",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  registerButton: {
    backgroundColor: "#FFD700",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  registerButtonText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#333333",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
  },
  footerText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#F0F0F0",
    marginRight: 5,
  },
  signInText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14,
    color: "#FFD700",
    textDecorationLine: "underline",
  },
});
