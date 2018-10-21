import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api.nub.international' : 'http://127.0.0.1:9001',
  withCredentials: true
})

export default api