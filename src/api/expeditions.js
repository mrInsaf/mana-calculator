import api from './index'
import axios from 'axios'

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
   * Добавить подзадачу из бэклога к задаче
   * @param {number} idTask - ID задачи
   * @param {number} backlogId - ID задачи из бэклога
   * @returns {Promise<Object>} Добавленная подзадача
   */
  addSubtaskFromBacklog: (idTask, backlogId) => 
    api.post(`/expedition/task/subtask?idTask=${idTask}&backlogId=${backlogId}`),

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
  create: (data) => api.post(`/expeditions?name=${encodeURIComponent(data.name)}&description=${encodeURIComponent(data.description)}`),

  /**
   * Обновить экспедицию
   * @param {number} id - ID экспедиции
   * @param {Object} data - Обновленные данные экспедиции
   */
  update: (id, data) => api.put(`/expeditions/${id}`, data),

  /**
   * Удалить экспедицию
   * @param {number} idExpedition - ID экспедиции
   */
  delete: (idExpedition) => api.delete(`/expedition?idExpedition=${idExpedition}`),

  /**
   * Получить задачи экспедиции
   * @param {number} id - ID экспедиции
   */
  getTasks: (id) => api.get(`/expedition/tasks?idExpedition=${id}`),

  /**
   * Создать новую задачу
   * @param {Object} params - Параметры задачи
   * @param {number} params.idExpedition - ID экспедиции
   * @param {string} params.name - Название задачи
   * @param {string} params.description - Описание задачи
   * @returns {Promise<Object>} Созданная задача
   */
  createTask: ({ idExpedition, name, description }) => 
    api.post(`/expedition/task?idExpedition=${idExpedition}&name=${encodeURIComponent(name)}&description=${encodeURIComponent(description)}`),

  async getTaskSubtasks(idTask) {
    try {
      console.log('Запрашиваем подзадачи для задачи:', idTask)
      const { data } = await api.get(`/expedition/task/subtasks`, {
        params: {
          idTask: idTask
        }
      })
      console.log('Ответ от сервера:', data)
      return data || []
    } catch (error) {
      console.error('Ошибка при получении подзадач:', error)
      return []
    }
  },
} 