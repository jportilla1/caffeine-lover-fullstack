import { View, Text, Image } from "react-native";
import { map } from "lodash";
import { styles } from "./ProductList.styles";
import { ENV } from "../../../utils"; // Importamos ENV

export function ProductList(props) {
  const { products } = props;

  return map(products, (product) => {
    const imageUrl = product.main_image?.url
      ? `${ENV.STATIC_URL}${product.main_image.url}`
      : null;

    return (
      <View key={product.id} style={styles.container}>
        <View style={styles.imageContainer}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.image} />
          ) : (
            <Text style={styles.noImage}>No hay imagen</Text>
          )}
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
            {product.title}
          </Text>
          <View style={styles.price}>
            <Text style={styles.currentPrice}>
              ${product.price}
              {" x "}
              {product.quantity}
            </Text>
          </View>
        </View>
      </View>
    );
  });
}
