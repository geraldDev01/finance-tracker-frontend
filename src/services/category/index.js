import { requestData } from "../axios/requestData";

export const getCategories = async () => {
  let url = `categories/`;

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
