import { View, Text } from "react-native";
import React from "react";
import { styles } from "./Buy.styles";
import { Button } from "react-native-paper";
import { useCart } from "../../../../hooks";
import Toast from "react-native-root-toast";

export function Buy(props) {
  const { productId } = props;
  const { addCart } = useCart();

  const addProductCart = async () => {
    try {
      await addCart(productId);
      Toast.show("Product added to cart", {
        position: Toast.positions.CENTER,
      });
    } catch (error) {
      Toast.show("Error adding product to cart", {
        position: Toast.positions.CENTER,
      });
    }
  };
  return (
    <Button
      mode="contained"
      contentStyle={styles.btnBuyContent}
      labelStyle={styles.btnLabel}
      style={styles.btn}
      onPress={addProductCart}
    >
      Add to Cart
    </Button>
  );
}
