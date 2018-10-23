import axios from 'axios'

const api = axios.create({
  baseURL: process.env.API_ENV || 'https://api.nub.international',
  withCredentials: true
})

export default api