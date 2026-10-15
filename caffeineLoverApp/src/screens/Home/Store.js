import { useState, useEffect } from "react";
import Toast from "react-native-root-toast";
import { homeBannerCtrl, productCtrl } from "../../api";
import { useAuth } from "../../hooks";
import { Layout } from "../../layouts";
import { GridProducts } from "../../components/Shared";

export function Store() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await productCtrl.getLatestPublished();
      setProducts(response?.data || []);
    } catch (error) {
      Toast.show("Error getting products", {
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <Layout.Back>
      <GridProducts title="New Products" products={products} />
    </Layout.Back>
  );
}
