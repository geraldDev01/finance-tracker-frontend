import { requestData } from "../axios/requestData";
import setAuthorizationToken from "@/utils/setAuthorizationToken";

export const createTransaction = async (params = {}) => {
  const { description, amount, category, type } = params;

  const data = {
    user: "1",
    type,
    category,
    amount,
    description,
  };

  let url = `transactions`;

  try {
    const response = await requestData({
      method: "POST",
      url,
      data,
    });

    return response.data;
  } catch (error) {
    return { error };
  }
};

export const getAllTransactions = async () => {
  let url = `transactions/`;

  try {
    const response = await requestData({
      method: "GET",
      url,
    });
    if (response.data) {
      const ResponseMapped = response.data.map((item) => {
        return {
          id:item.id,
          date: item.createdAt,
          description: item.description,
          category: item.transactionCategory.name,
          amount: item.amount,
          type: item.transactionType.typeName,
        };
      });
      return ResponseMapped;
    }
  } catch (error) {
    return { error };
  }
};

export const getSummary = async () => {
  let url = `summaries`;

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

export const deleteTransaction = async (id) => {
  let url = `transactions/${id}`;

  try {
    const response = await requestData({
      method: "DELETE",
      url,
    });
    console.log(response);
    return response;
  } catch (error) {
    return { error };
  }
};
