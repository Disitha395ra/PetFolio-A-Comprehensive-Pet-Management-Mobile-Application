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
import {useState} from "react";

export default function Register() {
  const navigation = useNavigation();

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");


  let [fontsLoaded] = useFonts({
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-light": require("../assets/fonts/Outfit-Light.ttf"),
  });

  if (!fontsLoaded) return null;

  const handlesginup = () => {
    if(!username || !email || !password || !confirmpassword){
      alert("Please fill all fields");
    }
    if(password !== confirmPassword){
      alert("Password do not match");
    }
    fetch("http://localhost:8080/api/auth/register",{
      method:"POST",
      headers:{
        "content-type":"application/json",
      },
      body:JSON.stringify({
        username,
        email,
        password,
      }),
    })
    .then((res)=>{
      if(res.ok){
        alert("Account created successfully");
        navigation.navigate("Login");
      }else{
        alert("Error creating account");
      }
    })
    .catch((err)=>{
      alert("Something went wrong. Please try again later");
      console.log(err);
    });
  }

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Image
            source={require("../assets/bgremove.png")} // Use your own register image or reuse login.gif
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          <TextInput
            style={styles.input}
            placeholder="User Name"
            placeholderTextColor="#8e7c7c"
            value={username}
            onChangeText={setusername}
          />
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
            value={password}
            onChangeText={setpassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#8e7c7c"
            value={confirmPassword}
            onChangeText={setconfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.loginButton} onPress={handlesginup}>
            <Text style={styles.loginText}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.footerText}>
            Already have an account?{" "}
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signup}>Login</Text>
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
    paddingTop: 60,
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
