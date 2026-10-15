import { useState, useEffect, createContext } from "react";
import { cartCtrl } from "../api";
import { useAuth } from "../hooks";

export const CartContext = createContext();

export function CartProvider(props) {
  const { children } = props;
  const [cart, setCart] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [reload, setReload] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      retriveCart(user.id);
      countTotalProducts(user.id);
    }
  }, [reload, user]);

  const onReload = () => setReload((prevState) => !prevState);

  const addCart = async (productId) => {
    try {
      if (user) {
        await cartCtrl.add(user.id, productId);
        onReload();
      }
    } catch (error) {
      throw error;
    }
  };

  const retriveCart = async (userId) => {
    try {
      const response = await cartCtrl.getAll(userId);
      setCart(response);
    } catch (error) {
      throw error;
    }
  };

  const countTotalProducts = async (userId) => {
    try {
      const response = await cartCtrl.count(userId);
      setTotalProducts(response);
    } catch (error) {
      throw error;
    }
  };

  const increaseProduct = async (productId) => {
    try {
      if (user) {
        await cartCtrl.increaseProduct(user.id, productId);
        onReload();
      }
    } catch (error) {
      throw error;
    }
  };

  const decreaseProduct = async (productId) => {
    try {
      if (user) {
        await cartCtrl.decreaseProduct(user.id, productId);
        onReload();
      }
    } catch (error) {
      throw error;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      if (user) {
        await cartCtrl.delete(user.id, productId);
        onReload();
      }
    } catch (error) {
      throw error;
    }
  };

  const emptyCart = async () => {
    try {
      if (user) {
        await cartCtrl.deleteAll(user.id);
        onReload();
      }
    } catch (error) {
      throw error;
    }
  };

  const data = {
    cart,
    totalProducts,
    addCart,
    deleteProduct,
    increaseProduct,
    decreaseProduct,
    emptyCart,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}
