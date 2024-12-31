import axios from "axios";

function createAxios() {
  return axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const api = createAxios();
