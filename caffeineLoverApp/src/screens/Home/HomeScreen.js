import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screensName } from "../../utils";
import { Layout } from "../../layouts";
import { UserInfo } from "../../components/Account";

export function HomeScreen() {
  const navigation = useNavigation();

  const openGameLink = () => {
    Linking.openURL("https://8th.io/jp9xh").catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <Layout.Home>
      <UserInfo />
      <Text style={styles.subtitle}>What are you looking for?</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate(screensName.home.coffeeShops)}
      >
        <ImageBackground
          source={require("../../../assets/CoffeeShops1.jpg")}
          style={styles.imageBackground}
          blurRadius={5}
        >
          <Text style={styles.cardText}>Coffee Shop</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate(screensName.home.store)}
      >
        <ImageBackground
          source={require("../../../assets/Store.jpg")}
          style={styles.imageBackground}
          blurRadius={5}
        >
          <Text style={styles.cardText}>Store</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate(screensName.home.tutorials)}
      >
        <ImageBackground
          source={require("../../../assets/Tutorials.jpg")}
          style={styles.imageBackground}
          blurRadius={5}
        >
          <Text style={styles.cardText}>Tutorials</Text>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={openGameLink}>
        <ImageBackground
          source={require("../../../assets/Game.jpg")}
          style={styles.imageBackground}
          blurRadius={5}
        >
          <Text style={styles.cardText}>Game</Text>
        </ImageBackground>
      </TouchableOpacity>
    </Layout.Home>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#6d4c41",
    marginBottom: 20,
    textAlign: "left",
    paddingHorizontal: 20,
  },
  card: {
    height: 150,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 20,
    marginHorizontal: 10,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
