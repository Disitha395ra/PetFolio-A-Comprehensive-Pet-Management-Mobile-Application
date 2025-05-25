import React from "react";
import { View } from "react-native";
import { Text } from "react-native";
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
          <Text></Text>
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
