import React, { useContext } from "react";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { UserContext } from "../contexts/UserContext"; // Importing UserContext
export default function Home() {
  const { user } = useContext(UserContext);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Text>Welcome, {user?.name}</Text>
    </View>
  );
}
const styles = StyleSheet.create({});
