import axios from 'axios';


export default axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}api/`,
  credentials: 'include',
  headers: {
    Accept: "application/json",
    'X-Requested-With': 'XMLHttpRequest',
    "Content-Type": "application/json",
  },
  withCredentials: true
});