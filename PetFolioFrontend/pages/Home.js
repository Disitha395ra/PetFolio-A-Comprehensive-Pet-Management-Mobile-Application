import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  PaperProvider,
  Avatar,
  Modal,
  Portal,
  TextInput,
  Card,
  Button,
} from "react-native-paper";
import { useFonts } from "expo-font";
import { UserContext } from "../contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import  { useContext, useEffect, useState } from "react";

export default function Home() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext); 

  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true); 

  let [fontsLoaded] = useFonts({
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-regular": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-light": require("../assets/fonts/Outfit-Light.ttf"),
  });

  useEffect(() => {
    if (user) {
      setLoading(true);
      fetch(`http://localhost:8080/api/pets/profile?username=${user}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => setPets(data))
        .catch((error) => console.error("Error fetching pets:", error))
        .finally(() => setLoading(false));
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
  const [petphoto, setpetphoto] = useState("");

  const addnewpet = () => {
    fetch("http://localhost:8080/api/pets/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user,
        petname,
        petage,
        petgender,
        petbirthdate,
        petdescription,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPets((prevPets) => [...prevPets, data]);
        setpetname("");
        setpetage("");
        setpetgender("");
        setpetbirthdate("");
        setpetdescription("");
        hideModal();
      })
      .catch((error) => console.error("Error adding pet:", error));
  };

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <View style={styles.container}>
          <View style={styles.welcomemsg}>
            <Text style={styles.welcomeText}>Hello, {user || "Guest"} 👋</Text>
            <Text style={styles.subtitle}>Welcome to petfolio</Text>
          </View>

          {loading ? (
            <View style={styles.loaderContainer}>
              <Image
                source={require("../assets/loading.gif")}
                style={styles.loadingGif}
              />
              <Text style={styles.subtitle}>Fetching your pets...</Text>
            </View>
          ) : pets.length === 0 ? (
            <Text style={styles.subtitle}>No pets found. Add a new one!</Text>
          ) : (
            <ScrollView style={{ width: "100%" }}>
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
                        // delete logic
                      }}
                    >
                      Delete Pet
                    </Button>
                  </Card.Actions>
                </Card>
              ))}
            </ScrollView>
          )}

          {/* Add Pet Modal */}
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={containerStyle}
            >
              <View>
                <Text style={styles.welcomeText}>Add a new pet</Text>
                <Text style={styles.subtitle}>Fill in the details below</Text>
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
                  label="Pet Description"
                  value={petdescription}
                  onChangeText={setpetdescription}
                  mode="outlined"
                  style={styles.input}
                />
                <Button
                  mode="contained"
                  style={styles.addpetButton}
                  onPress={addnewpet}
                >
                  Add Pet
                </Button>
              </View>
            </Modal>
          </Portal>

          {/* Floating Button to Show Modal */}
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
    color: "#3b2a2a",
  },
  addpetButton: {
    borderRadius: 30,
    marginTop: 10,
    backgroundColor: "#3b2a2a",
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  loadingGif: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
});
