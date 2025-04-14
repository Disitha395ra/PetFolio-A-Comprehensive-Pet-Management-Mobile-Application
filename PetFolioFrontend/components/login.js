import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Login() {
  const navigation = useNavigation();
  const {setUser} = useContext(UserContext);
  let [fontsLoaded] = useFonts({
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-light": require("../assets/fonts/Outfit-Light.ttf"),
  });
  if (!fontsLoaded) return null;

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handlelogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }
    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.user) {
          alert("Login successfully");
          setUser(data.user); // store user globally
          navigation.navigate("Tabnavigator");
        } else {
          alert("Invalid credentials");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Error logging in");
      });
  };

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Image
            source={require("../assets/bgremove.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login to continue</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#8e7c7c"
            keyboardType="email-address"
            value={email}
            onChangeText={setemail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#8e7c7c"
            secureTextEntry
            value={password}
            onChangeText={setpassword}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handlelogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Don’t have an account?{" "}
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles.signup}>Sign up</Text>
            </TouchableOpacity>
          </Text>
        </KeyboardAvoidingView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#aebbf8",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 30,
    paddingTop: 100,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontFamily: "outfit-bold",
    color: "#3b2a2a",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "outfit-light",
    color: "#3b2a2a",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: "outfit-regular",
    color: "#3b2a2a",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  loginButton: {
    backgroundColor: "#3b2a2a",
    paddingVertical: 15,
    width: "100%",
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "outfit-bold",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    fontFamily: "outfit-regular",
    color: "#3b2a2a",
  },
  signup: {
    fontFamily: "outfit-bold",
    color: "#b25e5e",
  },
});
