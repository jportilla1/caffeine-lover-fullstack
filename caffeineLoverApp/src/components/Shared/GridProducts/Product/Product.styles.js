// Product.styles.js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "50%",
    padding: 3,
  },
  product: {
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 10,
    alignItems: "center", // Centrar contenido en el contenedor
  },
  image: {
    width: "100%", // Asegurarse de que la imagen ocupe todo el ancho del contenedor
    height: 150,
    resizeMode: "contain", // Ajuste de tamaño de imagen
  },
  name: {
    marginTop: 10,
    fontSize: 16,

    textAlign: "center",
  },
  price: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#4E2C0B",
    textAlign: "center",
  },
});
