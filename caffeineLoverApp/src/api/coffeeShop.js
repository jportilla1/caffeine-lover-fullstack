import { ENV } from "../utils";

async function getCoffeeShops() {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.COFFEE_SHOPS}?populate=*`;
    const response = await fetch(url);

    if (!response.ok) throw response;

    return await response.json();
  } catch (error) {
    console.error("Error fetching coffee shops:", error);
    throw error;
  }
}

export const coffeeShopsCtrl = {
  getCoffeeShops,
};
