import axios from "axios";

export const requestData = ({ method, url, data }) => {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  return axios({
    method: method || "GET",
    baseURL: apiUrl,
    url: url || "",
    data: {
      ...data,
    },
    withCredentials: true,
  });
};
