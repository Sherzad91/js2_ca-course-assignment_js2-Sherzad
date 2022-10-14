export const API_URL = 'https://nf-api.onrender.com/api/v1';
export const USER = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';
export const REQUEST_HEADERS = {
  'content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${USER.accessToken}`,
};
