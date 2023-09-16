import { requestData } from "../axios/requestData";

export const getCategories = async () => {
  let url = `categories/`;

  try {
    const fetched = await requestData({
      method: "GET",
      url,
    });

    return fetched.data;
  } catch (error) {
    return { error };
  }
};
