import React, { useContext } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import { UserContext } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-paper";

export default function Home() {
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-light": require("../assets/fonts/Outfit-Light.ttf"),
  });
  if (!fontsLoaded) return null;


  return (
    <SafeAreaProvider>
      <PaperProvider>
        <View style={styles.container}>
          <View style={styles.welcomemsg}>
            <Text style={styles.welcomeText}>Hello, {user || "Guest"} 👋</Text>
            <Text style={styles.subtitle}>Welcome to petfolio</Text>
          </View>

          <TouchableOpacity style={styles.addButton} >
            <Avatar.Icon size={45} icon="plus" />
          </TouchableOpacity>
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6ecff",
    alignItems: "flex-start", // align items to the left
    paddingHorizontal: 30,
    paddingTop: 60, // create space from top
  },
  welcomeText: {
    fontSize: 26,
    fontFamily: "outfit-bold",
    color: "#3b2a2a",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "outfit-light",
    color: "#3b2a2a",
    marginTop: 5,
  },
  addButton: {
    borderRadius: 50,
    padding: 10,
    position: "absolute",
    bottom: 30,
    right: 30,
    shadowColor: "#000",
  },
  welcomemsg: {
    alignSelf: "flex-start", // make sure it's aligned to the left
    marginBottom: 20,
  },
});

