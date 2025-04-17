import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";
import { UserContext } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import { Avatar, Modal, Portal, TextInput } from "react-native-paper";
import { Card, Button } from "react-native-paper";
import React, { useContext, useEffect, useState } from "react";

export default function Home() {
  const navigation = useNavigation();

  const { user } = useContext(UserContext); // Assuming 'user' is the username
  const [pets, setPets] = useState([]);

  let [fontsLoaded] = useFonts({
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-light": require("../assets/fonts/Outfit-Light.ttf"),
  });

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:8080/api/pets/profile?username=${user}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => setPets(data))
        .catch((error) => console.error("Error fetching pets:", error));
    }
  }, [user]);

  if (!fontsLoaded) return null;

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: "#ffe4e1",
    padding: 20,
    margin: 20,
    borderRadius: 20,
  };

  const [petname, setpetname] = useState("");
  const [petage, setpetage] = useState("");
  const [petgender, setpetgender] = useState("");
  const [petbirthdate, setpetbirthdate] = useState("");
  const [petdescription, setpetdescription] = useState("");
  //const [petphoto, setpetphoto] = useState("");

  const addnewpet = () => {

  }

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <View style={styles.container}>
          <View style={styles.welcomemsg}>
            <Text style={styles.welcomeText}>Hello, {user || "Guest"} 👋</Text>
            <Text style={styles.subtitle}>Welcome to petfolio</Text>
          </View>
          <View>
            {pets.map((pet) => (
              <Card key={pet.petid} style={styles.card}>
                <Card.Title
                  title={pet.petname}
                  subtitle={`Owner: ${pet.username}`}
                />
                <Card.Cover
                  source={{ uri: pet.photo || "https://picsum.photos/700" }}
                />
                <Card.Content>
                  <Text>Age: {pet.petage}</Text>
                  <Text>Gender: {pet.gender}</Text>
                  <Text>Birthdate: {pet.birthdate}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button
                    onPress={() => {
                      /* delete logic here */
                    }}
                  >
                    Delete Pet
                  </Button>
                </Card.Actions>
              </Card>
            ))}
          </View>

          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
            >
              <View>
                <Text style={styles.welcomeText}>Add a new pet</Text>
                <Text style={styles.subtitle}>Fill in the details below</Text>
                {/* Add your form fields here */}
                <View>
                  <TextInput
                    label="Pet Name"
                    value={petname}
                    onChangeText={setpetname}
                    mode="outlined"
                    style={styles.input}
                  />
                  <TextInput
                    label="Pet Age"
                    value={petage}
                    onChangeText={setpetage}
                    mode="outlined"
                    style={styles.input}
                  />
                  <TextInput
                    label="Pet Gender"
                    value={petgender}
                    onChangeText={setpetgender}
                    mode="outlined"
                    style={styles.input}
                  />
                  <TextInput
                    label="Pet Birthdate"
                    value={petbirthdate}
                    onChangeText={setpetbirthdate}
                    mode="outlined"
                    style={styles.input}
                  />
                  <TextInput
                    label="Pet description"
                    value={petdescription}
                    onChangeText={setpetdescription}
                    mode="outlined"
                    style={styles.input}
                  />
                  <Button
                    mode="contained"
                    style={styles.addpetButton}
                    onPress={addnewpet}
                    buttonColor="#3b2a2a"
                    textColor="#fff"
                    >
                    Update Details
                  </Button>
                </View>
              </View>
            </Modal>
          </Portal>

          <TouchableOpacity style={styles.addButton} onPress={showModal}>
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
    alignItems: "flex-start",
    paddingHorizontal: 30,
    paddingTop: 50,
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
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
    borderRadius: 18,
    backgroundColor: "#f9f9ff",
    fontFamily: "outfit-regular",
    textColor: "#3b2a2a",
    color: "#3b2a2a",
  },
  addpetButton: {
    borderRadius: 30,
    marginTop: 10,
    backgroundColor: "#3b2a2a",
  },
});
