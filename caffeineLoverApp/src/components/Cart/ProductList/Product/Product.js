import { View, Text, Image, TextInput } from "react-native";
import { styles } from "./Product.styles";
import { useCart } from "../../../../hooks";
import { Button, IconButton } from "react-native-paper";
import { ENV } from "../../../../utils";

export function Product(props) {
  const { product } = props;
  const { deleteProduct, increaseProduct, decreaseProduct } = useCart();

  const onIncreaseProduct = () => increaseProduct(product.id);
  const onDecreaseProduct = () => decreaseProduct(product.id);
  const onDeleteProduct = () => deleteProduct(product.id);

  const mainImagen = product.main_image?.url
    ? `${ENV.API_URL.replace("/api", "")}${product.main_image.url}`
    : null;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {mainImagen ? (
          <Image source={{ uri: mainImagen }} style={styles.image} />
        ) : (
          <Text>No Image Available</Text>
        )}
      </View>

      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
            {product.title}
          </Text>
          <View style={styles.prices}>
            <Text style={styles.currentPrice}> ${product.price}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <View style={styles.selectQuantity}>
            <IconButton
              icon="plus"
              iconColor="#fff"
              size={19}
              style={styles.btnQuantity}
              onPress={onIncreaseProduct}
            />
            <TextInput
              value={product.quantity.toString()}
              style={styles.inputQuantity}
            />
            <IconButton
              icon="minus"
              iconColor="#fff"
              size={19}
              style={styles.btnQuantity}
              onPress={onDecreaseProduct}
            />
          </View>

          <Button
            mode="contained"
            style={styles.btnDelete}
            onPress={onDeleteProduct}
          >
            Delete
          </Button>
        </View>
      </View>
    </View>
  );
}
