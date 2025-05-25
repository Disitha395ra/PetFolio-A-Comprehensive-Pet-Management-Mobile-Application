import React from 'react';
import { View } from 'react-native';
import { Text, View } from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
export default function Landscreen(){
    const [fontsLoaded] = useFonts({
      Poppins_400Regular,
      Poppins_700Bold,
    });

    if (!fontsLoaded) {
      return null; // or <AppLoading />
    }
    return(
        <View>
            
        </View>
    )
}