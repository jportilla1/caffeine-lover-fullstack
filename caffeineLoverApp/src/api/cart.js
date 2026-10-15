import AsyncStorage from "@react-native-async-storage/async-storage";
import { map, forEach } from "lodash";
import { ENV } from "../utils";

async function getAllProducts(userId) {
  const key = `${ENV.STORAGE.CART}_${userId}`;
  const response = await AsyncStorage.getItem(key);

  if (!response) {
    return [];
  } else {
    return JSON.parse(response);
  }
}

async function addCart(userId, productId) {
  const products = await getAllProducts(userId);
  const objIndex = products.findIndex((product) => product.id === productId);

  if (objIndex < 0) {
    products.push({ id: productId, quantity: 1 });
  } else {
    const product = products[objIndex];
    products[objIndex].quantity = product.quantity + 1;
  }

  const key = `${ENV.STORAGE.CART}_${userId}`;
  await AsyncStorage.setItem(key, JSON.stringify(products));
}

async function count(userId) {
  const products = await getAllProducts(userId);
  let count = 0;
  forEach(products, (product) => {
    count += product.quantity;
  });
  return count;
}

async function deleteProduct(userId, productId) {
  const products = await getAllProducts(userId);
  const updateProducts = products.filter((product) => product.id !== productId);
  const key = `${ENV.STORAGE.CART}_${userId}`;
  await AsyncStorage.setItem(key, JSON.stringify(updateProducts));
}

async function increaseProduct(userId, productId) {
  try {
    const products = await getAllProducts(userId);
    map(products, (product) => {
      if (product.id === productId) {
        return (product.quantity += 1);
      }
    });

    const key = `${ENV.STORAGE.CART}_${userId}`;
    await AsyncStorage.setItem(key, JSON.stringify(products));
  } catch (error) {
    throw error;
  }
}

async function decreaseProduct(userId, productId) {
  try {
    let isDelete = false;

    const products = await getAllProducts(userId);
    map(products, (product) => {
      if (product.id === productId) {
        if (product.quantity === 1) {
          isDelete = true;
          return null;
        } else {
          return (product.quantity -= 1);
        }
      }
    });

    const key = `${ENV.STORAGE.CART}_${userId}`;
    if (isDelete) {
      await deleteProduct(userId, productId);
    } else {
      await AsyncStorage.setItem(key, JSON.stringify(products));
    }
  } catch (error) {
    throw error;
  }
}

async function deleteAll(userId) {
  const key = `${ENV.STORAGE.CART}_${userId}`;
  await AsyncStorage.removeItem(key);
}

export const cartCtrl = {
  getAll: getAllProducts,
  count,
  increaseProduct,
  add: addCart,
  delete: deleteProduct,
  decreaseProduct,
  deleteAll,
};
