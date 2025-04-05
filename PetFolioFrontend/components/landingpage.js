import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { StyleSheet, Text, View, Image } from "react-native";
import { useFonts } from "expo-font";

export default function LandingPage() {
    let [fontsLoaded] = useFonts({
      "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
      "outfit-regular": require("../assets/fonts/Outfit-Regular.ttf"),
      "outfit-light": require("../assets/fonts/Outfit-Light.ttf"),
    });
    if (!fontsLoaded) {
      return null; 
    }
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <View style={styles.container}>
          <Text style={styles.bannertext}>Welcome to the PetFolio</Text>
          <Text style={styles.underbannertext}>
            {"{ Happy pets, happy life }"}
          </Text>
          <Image
            source={require("../assets/landing.gif")}
            style={styles.gifImage}
            resizeMode="contain" // This ensures the gif maintains its aspect ratio
          />
          <Text style={styles.bannertextsub}>
            Manage your pet's needs and stay connected, all in one place
          </Text>
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4ded3",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  bannertext: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#3b2a2a",
    textAlign: "center",
    marginBottom: 30, // Spacing between the text and gif
    position: "absolute",
    top: "15%", // Positioning text at the top but not too close to the edge
    width: "80%", // Make sure it doesn't stretch beyond the screen width
    fontFamily: "outfit-bold",
  },
  gifImage: {
    width: "100%",
    height: 230,
    borderRadius: 20,
  },
  bannertextsub: {
    fontSize: 18,
    color: "#3b2a2a",
    textAlign: "center",
    marginTop: 10, // Spacing between the gif and the subtext
    position: "absolute",
    bottom: "10%", // Positioning text at the bottom but not too close to the edge
    width: "80%", // Make sure it doesn't stretch beyond the screen width
    fontFamily: "outfit-light",
  },
  underbannertext: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3b2a2a",
    textAlign: "center",
    marginBottom: 10, // Spacing between the text and gif
    position: "absolute",
    top: "253", // Positioning text at the top but not too close to the edge
    width: "80%", // Make sure it doesn't stretch beyond the screen width
    fontFamily: "outfit-regular",
  },
});
