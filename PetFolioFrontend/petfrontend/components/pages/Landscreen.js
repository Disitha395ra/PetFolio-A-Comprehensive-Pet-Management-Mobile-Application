import React, { useEffect } from "react";
import { View, Image, StatusBar } from "react-native";
import { StyleSheet, Text } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";

export default function Landscreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  useEffect(() => {
    
    const timer = setTimeout(() => {
      navigation?.replace("LoginScreen");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigation]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StatusBar barStyle="light-content" backgroundColor="#6C63FF" />
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.head}>Welcome to PetFolio!</Text>

            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/land.gif")}
                style={styles.gif}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.subhead}>
              Your one-stop pet management companion! Add your pets, track their
              health, store memories, and keep all their details in one place.
            </Text>

            <Text style={styles.highlight}>
              Start building your pet's story today! 🐾
            </Text>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Loading...</Text>
            </View>
          </View>
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 50,
  },
  head: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    textAlign: "center",
    color: "#FFFFFF",
    marginBottom: 30,
    letterSpacing: 0.5,
  },
  imageContainer: {
    marginVertical: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  gif: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  subhead: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#F0F0F0",
    lineHeight: 24,
    marginBottom: 20,
  },
  highlight: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    textAlign: "center",
    color: "#FFD700",
    marginBottom: 40,
  },
  footer: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
  },
  footerText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#E0E0E0",
    textAlign: "center",
  },
});
