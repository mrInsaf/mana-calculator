import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Интерцептор для обработки ответов
api.interceptors.response.use(
  response => response.data,
  error => {
    // Обработка ошибок
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export default api 