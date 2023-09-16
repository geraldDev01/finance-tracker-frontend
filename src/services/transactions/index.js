import { requestData } from "../axios/requestData";
import setAuthorizationToken from "../../utils/setAuthorizationToken";

export const createTransaction = async (params = {}) => {
  const {  } = params;

  const data = {
    email,
    password,
  };

  let url = `transaction/create`;

  try {
    const fetched = await requestData({
      method: "POST",
      url,
      data,
    });

    return fetched.data;
  } catch (error) {
    return { error };
  }
};
