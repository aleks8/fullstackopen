import axios from 'axios';
const baseUrl = '/api/users';

let token = null;

export const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

export const getAllUsers = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

export default { getAllUsers, setToken}