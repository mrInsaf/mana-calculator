import api from './index'

export const expeditionsApi = {
  /**
   * Получить список всех экспедиций
   */
  getAll: () => api.get('/expeditions'),

  /**
   * Получить бэклог задач
   * @returns {Promise<Array>} Массив задач из бэклога
   */
  getBacklog: () => api.get('/backlog'),

  /**
   * Получить экспедицию по ID
   * @param {number} id - ID экспедиции
   */
  getById: (id) => api.get(`/expeditions/${id}`),

  /**
   * Создать новую экспедицию
   * @param {Object} data - Данные экспедиции
   * @param {string} data.name - Название экспедиции
   * @param {string} data.description - Описание экспедиции
   */
  create: (data) => api.post('/expeditions', data),

  /**
   * Обновить экспедицию
   * @param {number} id - ID экспедиции
   * @param {Object} data - Обновленные данные экспедиции
   */
  update: (id, data) => api.put(`/expeditions/${id}`, data),

  /**
   * Удалить экспедицию
   * @param {number} id - ID экспедиции
   */
  delete: (id) => api.delete(`/expeditions/${id}`),

  /**
   * Получить задачи экспедиции
   * @param {number} id - ID экспедиции
   */
  getTasks: (id) => api.get(`/expeditions/${id}/tasks`)
} 