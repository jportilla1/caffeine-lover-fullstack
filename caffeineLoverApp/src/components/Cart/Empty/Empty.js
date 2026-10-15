import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./Empty.styles";

export function Empty() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/LogoCaffeine-brown.png")}
        style={styles.image}
      />
      <Text style={styles.text}>You have no products in your cart</Text>
    </View>
  );
}
