import { storageCrtl } from "../api/storageToken";
import { fn } from "../utils";

export async function authFetch(url, params) {
  const token = await storageCrtl.getToken();

  const logout = async () => {
    await storageCrtl.removeToken();
  };

  if (!token) {
    await logout();
    throw new Error("No token found. User is not authenticated.");
  } else {
    if (fn.tokenExpired(token)) {
      await logout();
      throw new Error("Token has expired. Please log in again.");
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        return await fetch(url, paramsTemp);
      } catch (error) {
        throw error;
      }
    }
  }
}
