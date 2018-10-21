import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.nub.international'
})

export default api