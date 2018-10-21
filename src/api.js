import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.nub.international',
  withCredentials: true
})

export default api