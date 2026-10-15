import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { screensName, ENV } from "../../../../utils";
import { styles } from "./Product.styles";

export function Product(props) {
  const { product } = props;
  const navigation = useNavigation();
  const mainImage = product.main_image?.url
    ? `${ENV.STATIC_URL}${product.main_image.url}`
    : null;

  const goToProduct = () => {
    navigation.navigate(screensName.home.product, {
      productId: product.documentId,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={goToProduct}>
      <View style={styles.container}>
        <View style={styles.product}>
          {mainImage ? (
            <Image source={{ uri: mainImage }} style={styles.image} />
          ) : (
            <Text>No Image Available</Text> // Mensaje en caso de que la imagen sea nula
          )}
          <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
            {product.title}
          </Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
