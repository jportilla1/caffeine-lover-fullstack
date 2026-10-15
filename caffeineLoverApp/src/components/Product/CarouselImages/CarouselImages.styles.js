import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  image: {
    width,
    height: width,
    resizeMode: "cover",
  },
  dotsContainer: {
    position: "absolute", // Asegura que los puntos estén posicionados en el contenedor
    bottom: 15, // Coloca los puntos a 15px de la parte inferior
    alignSelf: "center", // Centra los puntos horizontalmente
  },
});
