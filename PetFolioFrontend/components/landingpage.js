import React from "react";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { StyleSheet, Text, View, Image } from "react-native";
export default function LandingPage() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <View>
          <Image
            source={require("../assets/landing.gif")}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
