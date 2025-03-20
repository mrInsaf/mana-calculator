import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { expeditionsApi } from '../expeditions'
import { tasksApi } from '../tasks'

// Настраиваем моковый сервер
const server = setupServer(
  // Мок для получения списка экспедиций
  rest.get('http://localhost:8080/api/expeditions', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: 'Тестовая экспедиция',
          description: 'Описание тестовой экспедиции',
          tasks: []
        }
      ])
    )
  }),

  // Мок для создания экспедиции
  rest.post('http://localhost:8080/api/expeditions', async (req, res, ctx) => {
    const body = await req.json()
    return res(
      ctx.status(201),
      ctx.json({
        id: 2,
        ...body
      })
    )
  }),

  // Мок для получения задач экспедиции
  rest.get('http://localhost:8080/api/expeditions/1/tasks', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          title: 'Тестовая задача',
          description: 'Описание тестовой задачи',
          subtasks: [
            {
              name: 'Подзадача',
              level: 'Средний',
              type: 'Изменение',
              strategy: 5,
              magic: 3,
              combat: 2
            }
          ]
        }
      ])
    )
  }),

  // Мок для ошибки сервера
  rest.get('http://localhost:8080/api/expeditions/999', (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({ message: 'Экспедиция не найдена' })
    )
  })
)

// Включаем моковый сервер перед тестами
beforeAll(() => server.listen())

// Сбрасываем обработчики между тестами
afterEach(() => server.resetHandlers())

// Выключаем сервер после всех тестов
afterAll(() => server.close())

describe('API Tests', () => {
  describe('Expeditions API', () => {
    it('должен получить список экспедиций', async () => {
      const expeditions = await expeditionsApi.getAll()
      expect(expeditions).toHaveLength(1)
      expect(expeditions[0].name).toBe('Тестовая экспедиция')
    })

    it('должен создать новую экспедицию', async () => {
      const newExpedition = {
        name: 'Новая экспедиция',
        description: 'Описание новой экспедиции'
      }
      const created = await expeditionsApi.create(newExpedition)
      expect(created.id).toBe(2)
      expect(created.name).toBe(newExpedition.name)
    })

    it('должен получить задачи экспедиции', async () => {
      const tasks = await expeditionsApi.getTasks(1)
      expect(tasks).toHaveLength(1)
      expect(tasks[0].title).toBe('Тестовая задача')
      expect(tasks[0].subtasks).toHaveLength(1)
    })

    it('должен обработать ошибку 404', async () => {
      try {
        await expeditionsApi.getById(999)
        // Если не выбросило ошибку, тест должен упасть
        expect(true).toBe(false)
      } catch (error) {
        expect(error.response.status).toBe(404)
        expect(error.response.data.message).toBe('Экспедиция не найдена')
      }
    })
  })
}) 