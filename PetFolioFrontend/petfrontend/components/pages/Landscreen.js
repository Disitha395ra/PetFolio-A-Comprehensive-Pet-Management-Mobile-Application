import React from "react";
import { View, Image } from "react-native";
import { StyleSheet, Text } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
export default function Landscreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null; // or <AppLoading />
  }
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <View>
          <Text style={styles.head}>Welcome to the PetFolio !</Text>
          <Image src="../../assets/land.gif"></Image>
          <Text style={styles.subhead}>
            Your one-stop pet management companion! Add your pets, track their
            health, store memories, and keep all their details in one place.
            Start building your pet’s story today!
          </Text>
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
    head: {
        fontFamily: "Poppins_700Bold",
        fontSize: 24,
        textAlign: "center",
        marginTop: 20,
    },
    subhead: {
        fontFamily: "Poppins_400Regular",
        fontSize: 16,
        textAlign: "center",
        marginTop: 10,
        paddingHorizontal: 20,
    },
})
