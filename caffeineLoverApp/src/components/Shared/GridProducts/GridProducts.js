import { View, Text } from "react-native";
import { map } from "lodash";
import { Product } from "./Product";
import { styles } from "./GridProducts.styles";

export function GridProducts(props) {
  const { title, products } = props;

  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}

      <View style={styles.gridContainer}>
        {map(products, (item) => {
          if (!item || !item.id) {
            console.warn("Item or item.id is undefined:", item);
            return null;
          }

          return <Product key={item.id} product={item} />;
        })}
      </View>
    </View>
  );
}
