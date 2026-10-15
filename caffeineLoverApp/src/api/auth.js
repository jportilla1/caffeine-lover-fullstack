import { ENV } from "../utils";

async function register(email, username, password) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.REGISTER}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    };

    const response = await fetch(url, params);

    if (!response.ok) {
      const error = await response.json();
      console.error("Register Error Details:", error);
      throw new Error(
        error?.error?.message || "An error occurred during registration."
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Register Error:", error);
    throw error;
  }
}

async function login(email, password) {
  try {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.LOGIN}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: email,
        password,
      }),
    };

    const response = await fetch(url, params);

    if (response.status !== 200) {
      const error = await response.json();

      // Caso específico: correo no confirmado
      if (error?.error?.message === "Your account email is not confirmed") {
        throw {
          status: 403, // Usamos 403 para indicar "prohibido"
          message: "Please confirm your email to activate your account.",
        };
      }

      // Otros errores (credenciales inválidas, etc.)
      throw {
        status: response.status,
        message: error?.error?.message || "Authentication failed",
      };
    }

    const userData = await response.json();

    return userData;
  } catch (error) {
    throw error;
  }
}

// async function confirmEmail(confirmationCode) {
//   try {
//     const url = `${ENV.API_URL}/${ENV.ENDPOINTS.EMAIL_CONFIRMATION}?confirmation=${confirmationCode}`;
//     const response = await fetch(url);

//     if (response.status !== 200) throw response;

//     return await response.json();
//   } catch (error) {
//     throw new Error("Failed to confirm email.");
//   }
// }

export const authCtrl = {
  register,
  login,
  // confirmEmail,
};
