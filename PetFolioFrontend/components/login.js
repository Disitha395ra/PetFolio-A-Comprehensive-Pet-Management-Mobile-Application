import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Text, View, Image } from "react-native";
import { useFonts } from "expo-font";
export default function Login() {
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
        <View>
          <Text style={styles.header}>Welcome</Text>
          <Text style={styles.headersub}>Login to continue..</Text>
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  header: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#3b2a2a",
    textAlign: "center",
    marginBottom: 30, // Spacing between the text and gif
    position: "absolute",
    top: "15%", // Positioning text at the top but not too close to the edge
    width: "80%", // Make sure it doesn't stretch beyond the screen width
  },
  headersub: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#3b2a2a",
    textAlign: "center",
    marginBottom: 30, // Spacing between the text and gif
    position: "absolute",
    top: "15%", // Positioning text at the top but not too close to the edge
    width: "80%", // Make sure it doesn't stretch beyond the screen width
  },
});
