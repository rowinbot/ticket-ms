import axios from "axios";

function createAxios() {
  return axios.create({
    baseURL: "/api",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const api = createAxios();
