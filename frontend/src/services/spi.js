//Aquí se guarda la lógica de comunicación con el backend o APIs externas - axios.

import axios from "axios";

const API_URL = "https://tuapi.com/api";

export const loginUser = async (credentials) => {
  const res = await axios.post(`${API_URL}/login`, credentials);
  return res.data;
};