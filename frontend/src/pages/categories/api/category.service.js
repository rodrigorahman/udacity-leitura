import { API_BASE_URL } from '../../../core/shared.params';

const api = API_BASE_URL;

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token;
if (!token){
  token = localStorage.token = Math.random()
    .toString(36)
    .substr(-8);
}

const headers = {
  Accept: "application/json",
  Authorization: token
};

export const getAll = () => {
  return fetch(`${api}/categories`, { headers })
          .then(res => res.json())
          .then(data => data.categories);
}
  
