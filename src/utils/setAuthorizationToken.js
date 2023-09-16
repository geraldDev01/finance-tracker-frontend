import axios from "axios";

export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common["x-access-token"] = `bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["x-access-token"];
  }
}
