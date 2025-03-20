import api from './index'

export const tasksApi = {
  /**
   * Получить список всех задач
   */
  getAll: () => api.get('/tasks'),

  /**
   * Получить задачу по ID
   * @param {number} id - ID задачи
   */
  getById: (id) => api.get(`/tasks/${id}`),

  /**
   * Создать новую задачу
   * @param {Object} data - Данные задачи
   * @param {string} data.title - Название задачи
   * @param {string} data.description - Описание задачи
   * @param {Array} data.subtasks - Список подзадач
   * @param {number} data.expeditionId - ID экспедиции
   */
  create: (data) => api.post('/tasks', data),

  /**
   * Обновить задачу
   * @param {number} id - ID задачи
   * @param {Object} data - Обновленные данные задачи
   */
  update: (id, data) => api.put(`/tasks/${id}`, data),

  /**
   * Удалить задачу
   * @param {number} id - ID задачи
   */
  delete: (id) => api.delete(`/tasks/${id}`)
} 