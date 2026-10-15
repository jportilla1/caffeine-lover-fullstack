import { ENV } from "../utils";
import { authFetch } from "../lib";

async function getMe() {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS_ME}`;
    const response = await authFetch(url);
    // const params = {
    //   method: "GET",
    //   headers: {
    //     Authorization:
    //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzMwNjA0Mjc5LCJleHAiOjE3MzMxOTYyNzl9.Hp319bfKfHgM2u9Yfi0v3guydCvoYmBkFpXVMy2Mr78",
    //   },
    // };

    // const response = await fetch(url, params);

    if (response.status !== 200) throw response;

    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function updateUser(userId, formData) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS}/${userId}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const response = await authFetch(url, params);

    if (response.status !== 200) throw response;

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export const userCtrl = {
  getMe,
  updateUser,
};
