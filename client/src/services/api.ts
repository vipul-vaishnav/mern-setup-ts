import axios from 'axios'

const baseURL = '/api/v1' // Proxy path, as defined in vite.config.js

const api = axios.create({
  baseURL
})

export default api
