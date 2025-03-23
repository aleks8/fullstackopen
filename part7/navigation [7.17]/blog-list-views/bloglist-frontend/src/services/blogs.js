import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

export const setToken = newToken => {
  token = `Bearer ${newToken}`;
};
export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

export const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

export const remove = id => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request.then(response => response.data);
};

export const update = (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log('`${baseUrl}/${id}`', `${baseUrl}/${newObject.id}`);
  console.log('newObject', newObject);
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject);
  return request.then(response => response.data);
};
/*
const update = async updateObject => {
  const config = {    
    headers: { Authorization: token },  
  }
  const response = await axios.put(baseUrl, newObject, config)  
  return response.data
}*/

export default { getAll, create, setToken, update, remove };
