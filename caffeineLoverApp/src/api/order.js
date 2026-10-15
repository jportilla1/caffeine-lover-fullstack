import { authFetch } from "../lib";
import { ENV } from "../utils";

async function payment(token, userId, products) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.PAYMENT_ORDER}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        products,
        userId,
      }),
    };

    const response = await authFetch(url, params);

    return response;
  } catch (error) {
    throw error;
  }
}

async function getAll(userId) {
  try {
    const userFilter = `filters[user][id][$eq]=${userId}`;
    const sortFilter = "sort[0]=createdAt:desc";
    const filters = `${userFilter}&${sortFilter}`;

    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDERS}?${filters}`;

    const response = await authFetch(url);

    if (response.status !== 200) throw response;

    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function getOrderById(documentId) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ORDERS}/${documentId}`;
    console.log("Fetching order with documentId:", documentId);
    console.log("API URL:", url);

    const response = await authFetch(url);

    if (response.status !== 200)
      throw new Error(`HTTP error: ${response.status}`);

    const result = await response.json();
    console.log("Raw API response:", result);

    if (!result.data) {
      throw new Error("Order not found");
    }

    const order = result.data;

    return {
      ...order,
      products: order.products || [],
    };
  } catch (error) {
    console.error("Error in getOrderById:", error);
    throw error;
  }
}

export const orderCtrl = {
  payment,
  getAll,
  getById: getOrderById,
};
