export const ENV = {
  API_URL: "http://192.168.0.149:1337/api",
  STATIC_URL: "http://192.168.0.149:1337",
  ENDPOINTS: {
    REGISTER: "auth/local/register",
    LOGIN: "auth/local",
    EMAIL_CONFIRMATION: "auth/email-confirmation",
    USERS_ME: "users/me",
    USERS: "users",
    ADDRESSES: "addresses",
    PRODUCTS: "products",
    TUTORIALS: "tutorials",
    COFFEE_SHOPS: "coffee-shops",
    PAYMENT_ORDER: "payment-order",
    ORDERS: "orders",
  },

  STORAGE: {
    TOKEN: "token",
    CART: "cart",
  },

  STRIPE: {
    PUBLISHEBLE_KEY:
      "pk_test_51QCUwKA2ytltRTmk80iMDnJeLU8btz6Ly0iTIm8ere6C6lcM5tuH5zycHBfuSvUYcqlluWXf56Zo7pdPiSqAEtVc00YCrMmq3B",
  },
};
