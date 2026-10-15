import { useState, useCallback } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
import Toast from "react-native-root-toast";
import { orderCtrl } from "../../../api";
import { useAuth } from "../../../hooks";
import { Layout } from "../../../layouts";
import { LoadingScreen } from "../../../components/Shared";
import { OrderList } from "../../../components/Orders";
import { styles } from "./OrdersScreen.styles";

export function OrdersScreen() {
  const [orders, setOrders] = useState(null);
  const { user } = useAuth();

  useFocusEffect(
    useCallback(() => {
      getOrders();
    }, [])
  );

  const getOrders = async () => {
    try {
      const response = await orderCtrl.getAll(user.id);
      setOrders(response.data);
    } catch (error) {
      Toast.show("Error al obtener los pedidos", {
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <Layout.Basic>
      <View style={styles.container}>
        {!orders ? (
          <LoadingScreen text="Loading" />
        ) : size(orders) === 0 ? (
          <Text style={styles.noOrders}>You have no orders</Text>
        ) : (
          <>
            <Text style={styles.title}>My Orders</Text>
            <OrderList orders={orders} />
          </>
        )}
      </View>
    </Layout.Basic>
  );
}
