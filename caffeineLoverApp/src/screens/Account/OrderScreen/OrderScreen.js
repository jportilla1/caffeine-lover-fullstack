import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import { orderCtrl } from "../../../api";
import { Layout } from "../../../layouts";
import { LoadingScreen, Separator } from "../../../components/Shared";
import { ProductList, Address } from "../../../components/Orders";
import { styles } from "./OrderScreen.styles";

export function OrderScreen(props) {
  const {
    route: { params },
  } = props;

  const [order, setOrder] = useState(null);
  const navigation = useNavigation();
  const documentId = params.documentId;

  useEffect(() => {
    navigation.setOptions({ title: `Order ` });
    getOrder();
  }, []);

  const getOrder = async () => {
    try {
      const response = await orderCtrl.getById(documentId);
      setOrder(response);
    } catch (error) {
      Toast.show("Error getting orders", {
        position: Toast.positions.CENTER,
      });
    }
  };

  if (!order) {
    return <LoadingScreen />;
  }

  return (
    <Layout.Basic hideSearch>
      <View style={styles.container}>
        <Separator height={20} />
        <Text style={styles.title}>Products</Text>
        <ProductList products={order.products} />
        <Text style={styles.totalPayment}>Total: $ {order.totalPayment}</Text>
      </View>
    </Layout.Basic>
  );
}
