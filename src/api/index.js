import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:7070',
  headers: {
    'Content-Type': 'application/json',
    'X-User-Role': '1' // По умолчанию роль мастера
  }
})

// Функция для обновления роли
const updateUserRole = (isLibrarian) => {
  api.defaults.headers['X-User-Role'] = isLibrarian ? '2' : '1'
}

// Интерцептор для обработки ответов
api.interceptors.response.use(
  response => response.data,
  error => {
    // Обработка ошибок
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export { api as default, updateUserRole } 