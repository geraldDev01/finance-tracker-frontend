import { requestData } from "../axios/requestData";

export const login = async (params = {}) => {
  const { email, password } = params;

  const data = {
    email,
    password,
  };

  let url = `auth/login`;

  try {
    const response = await requestData({
      method: "POST",
      url,
      data,
    });

    const { token, user } = response.data;

    localStorage.setItem("jwtToken", token);
    localStorage.setItem("userID", user.id);

    return response.data;
  } catch (error) {
    return { error };
  }
};

export const register = async (params = {}) => {
  const { fullName, email, password } = params;

  const data = {
    fullName,
    email,
    password,
  };

  let url = `auth/register`;

  try {
    const response = await requestData({
      method: "POST",
      url,
      data,
    });

    const { token } = response.data;
    console.log("this is token", token);
    localStorage.setItem("jwtToken", token);

    return response.data;
  } catch (error) {
    return { error };
  }
};

export const logOut = async () => {
  try {
    localStorage.removeItem("jwtToken");

    return { message: "Logged out successfully" };
  } catch (error) {
    return { error };
  }
};

export const getUser = async (id) => {
  let url = `users/${id}`;

  try {
    const response = await requestData({
      method: "GET",
      url,
  
    });

    return response.data;
  } catch (error) {
    return { error };
  }
};
