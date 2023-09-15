import { requestData } from "../axios/requestData";
import setAuthorizationToken from "../../utils/setAuthorizationToken";

export const login = async (params = {}) => {
  const { email, password } = params;

  const data = {
    email,
    password,
  };

  let url = `auth/login`;

  try {
    const fetched = await requestData({
      method: "POST",
      url,
      data,
    });

    const { token } = fetched.data;

    setAuthorizationToken(token);

    return fetched.data;
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
    const fetched = await requestData({
      method: "POST",
      url,
      data,
    });

    const { token } = fetched.data;

    setAuthorizationToken(token);

    return fetched.data;
  } catch (error) {
    return { error };
  }
};