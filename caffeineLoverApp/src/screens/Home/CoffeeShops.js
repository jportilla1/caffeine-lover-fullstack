import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from "react-native";
import Toast from "react-native-root-toast";
import { Layout } from "../../layouts";
import * as Linking from "expo-linking";
import { ENV } from "../../utils";

export function CoffeeShops() {
  const [coffeeShops, setCoffeeShops] = useState([]);

  useEffect(() => {
    fetchCoffeeShops();
  }, []);

  const fetchCoffeeShops = async () => {
    try {
      const url = `${ENV.API_URL}/${ENV.ENDPOINTS.COFFEE_SHOPS}?populate=*`;
      // console.log("Requesting Coffee Shops from:", url);

      const response = await fetch(url);
      const data = await response.json();

      // console.log("Coffee shops response:", data);
      setCoffeeShops(data?.data || []); // Asigna los datos recibidos
    } catch (error) {
      // console.error("Error fetching coffee shops:", error);
      Toast.show("Error loading coffee shops", {
        position: Toast.positions.CENTER,
      });
    }
  };

  const openGoogleMaps = async (address) => {
    try {
      const encodedAddress = encodeURIComponent(address);
      const url = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Toast.show("Cannot open the URL. Please try again later.", {
          position: Toast.positions.CENTER,
        });
      }
    } catch (error) {
      // console.error("Error opening Google Maps:", error);
    }
  };

  return (
    <Layout.Back>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {coffeeShops.length > 0 ? (
          coffeeShops.map((shop) => {
            const { id, name, address, image } = shop;

            const imageUrl =
              image?.length > 0 &&
              (image[0]?.formats?.small?.url ||
                image[0]?.formats?.thumbnail?.url)
                ? `${ENV.API_URL.replace("/api", "")}${
                    image[0]?.formats?.small?.url ||
                    image[0]?.formats?.thumbnail?.url
                  }`
                : null;

            return (
              <TouchableOpacity
                key={id}
                style={styles.shopContainer}
                onPress={() => openGoogleMaps(address)}
              >
                {imageUrl ? (
                  <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.placeholderImage}>
                    <Text style={styles.placeholderText}>No Image</Text>
                  </View>
                )}
                <Text style={styles.name}>{name || "Unnamed Coffee Shop"}</Text>
                <Text style={styles.address}>
                  {address || "No Address Available"}
                </Text>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={styles.emptyText}>No coffee shops available</Text>
        )}
      </ScrollView>
    </Layout.Back>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  shopContainer: {
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 15,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  placeholderImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: "#aaa",
    fontSize: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  address: {
    fontSize: 14,
    color: "#555",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});
