import { getFormattedDate } from "@/utils";
import { requestData } from "../axios/requestData";

export const createTransaction = async (params = {}) => {
  const userId = localStorage.getItem("userID");
  const { description, amount, category, type } = params;

  const data = {
    user: userId,
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
        const formattedDate = getFormattedDate(item.createdAt);
        return {
          id: item.id,
          date: formattedDate,
          description: item.description,
          category: item.transactionCategory.name,
          amount: item.amount,
          type: item.transactionType.name,
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
    return response;
  } catch (error) {
    return { error };
  }
};
