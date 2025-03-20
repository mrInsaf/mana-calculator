import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:7070',  // Убедитесь, что порт совпадает с портом вашего сервера
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
    if (error.response) {
      console.log('Статус ответа:', error.response.status)
      console.log('Данные ответа:', error.response.data)
    } else if (error.request) {
      console.log('Запрос был сделан, но ответ не получен')
      console.log('Детали запроса:', error.request)
    }
    return Promise.reject(error)
  }
)

export { api as default, updateUserRole } 