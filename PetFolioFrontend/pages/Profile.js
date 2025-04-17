import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider, Avatar, Button } from "react-native-paper";
import { useFonts } from "expo-font";
import { UserContext } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import {  useEffect, useState } from "react";

export default function Profile() {
  const { user } = useContext(UserContext); // globally stored username
  const [profile, setProfile] = useState(null);
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: user }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => {
        console.log("Error loading profile:", err);
      });
  }, [user]);

  if (!profile) return <Text>Loading...</Text>;

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

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <View style={styles.container}>
          <View style={styles.profileInfo}>
            <Avatar.Text
              size={80}
              label={user?.charAt(0).toUpperCase() || "G"}
            />
            <Text style={styles.userName}>{profile.username}</Text>
            <Text style={styles.userEmail}>{profile.email}</Text>
          </View>

          <Button
            mode="contained"
            style={styles.logoutButton}
            onPress={handleLogout}
            buttonColor="#3b2a2a"
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
  logoutButton: {
    marginTop: 20,
    width: "60%",
    borderRadius: 30,
  },
});
