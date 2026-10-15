import { View, Text } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { styles } from "./CartScreen.styles";
import { useCart, useAuth } from "../../../hooks";
import { productCtrl, addressCtrl } from "../../../api";
import { Layout } from "../../../layouts";
import { LoadingScreen } from "../../../components/Shared";
import { size } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Cart } from "../../../components/Cart";
import { useFocusEffect } from "@react-navigation/native";

export function CartScreen() {
  const [products, setProducts] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const { user } = useAuth();
  const { cart } = useCart();

  useEffect(() => {
    getProducts();
  }, [cart]);

  useEffect(() => {
    loadAddresses();
  }, []);

  const getProducts = async () => {
    const productsTemp = [];
    let totalPaymentTemp = 0;

    for await (const item of cart) {
      const response = await productCtrl.getByDocumentId(item.id);

      if (response && response.data && response.data.length > 0) {
        const productData = response.data[0];
        productsTemp.push({ ...productData, ...item });

        const priceProduct = productData.price || 0;
        totalPaymentTemp += priceProduct * item.quantity;
      }
    }

    setProducts(productsTemp);
    setTotalPayment(totalPaymentTemp);
  };

  const loadAddresses = async () => {
    const response = await addressCtrl.getAll(user.id);
    setAddresses(response.data);
  };

  useFocusEffect(
    useCallback(() => {
      // Llama a las funciones de actualización
      loadAddresses();
      getProducts();
    }, [cart, user.id]) // Dependencias relevantes
  );

  return (
    <Layout.Cart>
      {!products ? (
        <LoadingScreen text="Loading Cart" />
      ) : size(products) === 0 ? (
        <Cart.Empty />
      ) : (
        <KeyboardAwareScrollView extraScrollHeight={25}>
          <View style={styles.container}>
            <Cart.ProductList products={products} />
            <Cart.AddressList
              addresses={addresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            />
            {selectedAddress && (
              <Cart.Payment
                totalPayment={totalPayment}
                selectedAddress={selectedAddress}
                products={products}
              />
            )}
          </View>
        </KeyboardAwareScrollView>
      )}
    </Layout.Cart>
  );
}
