import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { forEach } from "lodash";
import { productCtrl } from "../../api";
import { Layout } from "../../layouts";
import { Product } from "../../components/Product";
import { ENV } from "../../utils";

export function ProductScreen(props) {
  const {
    route: { params },
  } = props;

  const productId = params.productId;
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getProduct();
  }, [productId]);

  const getProduct = async () => {
    try {
      const response = await productCtrl.getByDocumentId(productId);

      if (response && response.data && response.data.length > 0) {
        const productData = response.data[0];
        setProduct(productData);

        const mainImage = productData.main_image?.url
          ? `${ENV.API_URL.replace("/api", "")}${productData.main_image.url}`
          : null;

        const images = productData.images || [];
        const arrayImages = mainImage ? [mainImage] : [];

        forEach(images, (image) => {
          if (image.url) {
            arrayImages.push(`${ENV.API_URL.replace("/api", "")}${image.url}`);
          }
        });

        setImages(arrayImages);
      } else {
        console.error("Product attributes not found");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  return (
    <>
      <Layout.Back>
        <View style={styles.container}>
          {product ? (
            <>
              <Product.Title text={product.title} />
              <Product.CarouselImages images={images} />
              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Price:</Text>
                <Text style={styles.priceValue}> ${product.price}</Text>
              </View>
            </>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>
      </Layout.Back>

      {product && <Product.BottomBar productId={productId} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 50,
  },
  priceLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  priceValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
  },
});
