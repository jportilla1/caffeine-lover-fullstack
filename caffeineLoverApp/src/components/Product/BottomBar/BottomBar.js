import { View, Text } from "react-native";
import React from "react";
import { styles } from "./BottomBar.styles";
import { Buy } from "./Buy";

export function BottomBar(props) {
  const { productId } = props;

  return (
    <View style={styles.container}>
      <View style={styles.buy}>
        <Buy productId={productId} />
      </View>
    </View>
  );
}
