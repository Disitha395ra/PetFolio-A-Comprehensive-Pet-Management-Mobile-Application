import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  PaperProvider,
  Avatar,
  Button,
  TextInput,
  DefaultTheme,
} from "react-native-paper";
import { useFonts } from "expo-font";
import { UserContext } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3b2a2a",
    background: "#ffffff",
    text: "#3b2a2a",
    placeholder: "#7a7a7a",
  },
};

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [upusername, setupusername] = useState("");
  const [upemail, setupemail] = useState("");
  const [uppassword, setuppassword] = useState("");
  const [uppasswordconfirm, setuppasswordconfirm] = useState("");
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-light": require("../assets/fonts/Outfit-Light.ttf"),
  });
  if (!fontsLoaded) return null;

  useEffect(() => {
    fetch("http://localhost:8080/api/user/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user }),
    })
      .then((res) => res.json())
      .then((data) => setProfile(data))
      .catch((err) => console.log("Error loading profile:", err));
  }, [user]);

  if (!profile) {
    return (
      <SafeAreaProvider>
        <PaperProvider theme={customTheme}>
          <View style={styles.container}>
            <Text>Loading...</Text>
          </View>
        </PaperProvider>
      </SafeAreaProvider>
    );
  }

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            setUser(null);
            navigation.navigate("Login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleSavedata = () => {
    alert("Profile Update", "This function is under development.");
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={customTheme}>
        <View style={styles.container}>
          <View style={styles.profileInfo}>
            <Avatar.Text
              size={80}
              label={profile.username.charAt(0).toUpperCase()}
            />
            <Text style={styles.userName}>{profile.username}</Text>
            <Text style={styles.userEmail}>{profile.email}</Text>
          </View>

          <Text style={styles.welcomeText}>Update Your Details 🧩</Text>
          <Text style={styles.subtitle}>
            Remember your new password and email
          </Text>
          <View style={styles.form}>
            <TextInput
              label="Username"
              value={upusername}
              onChangeText={setupusername}
              mode="outlined"
              style={styles.input}
              theme={customTheme}
            />
            <TextInput
              label="User Email"
              value={upemail}
              onChangeText={setupemail}
              mode="outlined"
              style={styles.input}
              theme={customTheme}
              keyboardType="email-address"
            />
            <TextInput
              label="User Password"
              value={uppassword}
              onChangeText={setuppassword}
              mode="outlined"
              style={styles.input}
              theme={customTheme}
              secureTextEntry
            />
            <TextInput
              label="Confirm Password"
              value={uppasswordconfirm}
              onChangeText={setuppasswordconfirm}
              mode="outlined"
              style={styles.input}
              theme={customTheme}
              secureTextEntry
            />
            <Button
              mode="contained"
              style={styles.updateButton}
              onPress={handleSavedata}
              buttonColor="#3b2a2a"
              textColor="#fff"
            >
              Update Details
            </Button>
          </View>

          <Button
            mode="contained"
            style={styles.logoutButton}
            onPress={handleLogout}
            buttonColor="#dc143c"
            textColor="#fff"
          >
            Logout
          </Button>
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6ecff",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 30,
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 40,
  },
  userName: {
    fontSize: 26,
    fontFamily: "outfit-bold",
    color: "#3b2a2a",
    marginTop: 10,
  },
  userEmail: {
    fontSize: 14,
    fontFamily: "outfit-light",
    color: "#3b2a2a",
    marginTop: 5,
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: "outfit-bold",
    color: "#3b2a2a",
    marginBottom: 10,
  },
  form: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
    borderRadius: 18,
    backgroundColor: "#f9f9ff",
    fontFamily: "outfit-regular",
  },
  updateButton: {
    borderRadius: 30,
    marginTop: 10,
  },
  logoutButton: {
    marginTop: 40,
    width: "100%",
    borderRadius: 30,
    backgroundColor: "#dc143c",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "outfit-light",
    color: "#3b2a2a",
    marginTop: 5,
  },
});
