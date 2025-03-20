<template>
  <div class="expedition-content" :class="{ 'blur': isModalOpen }">
    <div class="sidebar">
      <h3>Хроника</h3>
      <div class="expedition-list">
        <button 
          v-for="expedition in expeditions" 
          :key="expedition.id"
          class="expedition-item"
          :class="{ active: currentExpedition?.id === expedition.id }"
          @click="selectExpedition(expedition)"
        >
          {{ expedition.name }}
          <div class="expedition-actions" v-if="currentExpedition?.id === expedition.id">
            <img src="/cancel.png" alt="Delete" class="delete-icon" @click.stop="deleteExpedition" />
          </div>
        </button>
        <button class="expedition-item add-expedition" @click="createExpedition">
          + Новая экспедиция
        </button>
      </div>
    </div>

    <div class="main-content">
      <div v-if="currentExpedition" class="expedition-form">
        <div class="form-group">
          <label>Название экспедиции</label>
          <input 
            type="text" 
            v-model="currentExpedition.name" 
            class="input-field" 
          />
        </div>

        <div class="form-group">
          <label>Описание экспедиции</label>
          <textarea 
            v-model="currentExpedition.description" 
            class="input-field"
          ></textarea>
        </div>

        <div class="tasks-section">
          <div class="tasks-header">
            <h3>Список задач</h3>
            <button class="add-task" @click="addTask">+</button>
          </div>

          <div class="tasks-grid">
            <template v-if="currentExpedition.tasks && currentExpedition.tasks.length > 0">
              <TaskCard 
                v-for="task in currentExpedition.tasks" 
                :key="task.id"
                :task="task"
                @click="editTask(task)"
              />
            </template>
            <div v-else class="empty-tasks">
              Добавь задачи, нажав на плюсик. Воинам нужно чем-то заниматься
            </div>
          </div>
        </div>

        <button class="save-button" @click="saveExpedition">Сформировать отряд</button>
      </div>
      <div v-else class="empty-state">
        Выберите экспедицию или создайте новую
      </div>
    </div>
  </div>
  <TaskModal 
    v-if="isModalOpen" 
    @close="isModalOpen = false"
    @save="handleTaskSave"
  />
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'
import TaskCard from './TaskCard.vue'
import TaskModal from './TaskModal.vue'
import { expeditionsApi } from '../api/expeditions'
import { tasksApi } from '../api/tasks'

const currentExpedition = ref(null)
const expeditions = ref([])
const isModalOpen = ref(false)

// Загрузка экспедиций при монтировании компонента
onMounted(async () => {
  try {
    const data = await expeditionsApi.getAll()
    expeditions.value = data
    console.log('Загруженные экспедиции:', data)
  } catch (error) {
    console.error('Ошибка при загрузке экспедиций:', error)
  }
})

const selectExpedition = async (expedition) => {
  currentExpedition.value = expedition
  try {
    const tasks = await expeditionsApi.getTasks(expedition.id)
    currentExpedition.value.tasks = tasks
    console.log('Загруженные задачи:', tasks)
  } catch (error) {
    console.error('Ошибка при загрузке задач:', error)
  }
}

const createExpedition = () => {
  const newExpedition = {
    id: expeditions.value.length + 1,
    name: `Экспедиция ${expeditions.value.length + 1}`,
    description: '',
    tasks: []
  }
  expeditions.value.push(newExpedition)
  currentExpedition.value = newExpedition
}

const deleteExpedition = async () => {
  if (!currentExpedition.value) return
  
  try {
    await expeditionsApi.delete(currentExpedition.value.id)
    const index = expeditions.value.findIndex(e => e.id === currentExpedition.value.id)
    if (index !== -1) {
      expeditions.value.splice(index, 1)
      currentExpedition.value = expeditions.value[0] || null
    }
  } catch (error) {
    console.error('Ошибка при удалении экспедиции:', error)
  }
}

const addTask = () => {
  isModalOpen.value = true
}

const handleTaskSave = async (taskData) => {
  if (!currentExpedition.value) return

  try {
    const newTask = {
      ...taskData,
      expeditionId: currentExpedition.value.id
    }
    const savedTask = await tasksApi.create(newTask)
    currentExpedition.value.tasks.push(savedTask)
  } catch (error) {
    console.error('Ошибка при сохранении задачи:', error)
  }
}

const editTask = (task) => {
  // TODO: Implement task editing
}

const saveExpedition = async () => {
  if (!currentExpedition.value) return

  try {
    await expeditionsApi.update(currentExpedition.value.id, currentExpedition.value)
    console.log('Экспедиция сохранена')
  } catch (error) {
    console.error('Ошибка при сохранении экспедиции:', error)
  }
}
</script>

<style scoped>
.expedition-content {
  display: flex;
  gap: 2rem;
  height: 100%;
}

.sidebar {
  width: 250px;
  background: rgba(107, 78, 230, 0.1);
  padding: 1rem;
  border-radius: 1rem;
  height: 100%;
}

.expedition-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.expedition-item {
  background: transparent;
  font-size: 1rem;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  text-align: left;
  cursor: pointer;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Pixelizer', sans-serif;
  width: 100%;
  position: relative;
}

.expedition-item:hover {
  background: rgba(107, 78, 230, 0.2);
}

.expedition-item.active {
  background: var(--primary-color);
}

.expedition-actions {
  position: absolute;
  top: -8px;
  right: -8px;
}

.delete-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.add-expedition {
  color: var(--primary-light);
}

.main-content {
  flex: 1;
  padding: 2rem;
  background: var(--container-background);
  border-radius: 1rem;
  height: 100%;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--primary-light);
  font-size: 1.5rem;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  background: rgba(139, 111, 255, 0.1);
  border: none;
  border-radius: 0.5rem;
  color: var(--text-color-dark);
  font-family: 'Pixelizer', sans-serif;
  font-size: 1rem;
}

textarea.input-field {
  min-height: 100px;
  resize: vertical;
}

.tasks-section {
  margin-top: 2rem;
}

.tasks-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

h3 {
  font-size: 2rem;
  color: var(--primary-light);
  margin: 0;
}

.add-task {
  background: var(--primary-light);
  border: none;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.empty-tasks {
  text-align: center;
  padding: 2rem;
  color: var(--primary-light);
  font-size: 1.2rem;
  opacity: 0.8;
  grid-column: 1 / -1;
  background: rgba(139, 111, 255, 0.1);
  border-radius: 1rem;
}

.save-button {
  background: var(--primary-light);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-family: 'Pixelizer', sans-serif;
  margin-top: 2rem;
  float: right;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--primary-light);
  font-size: 1.5rem;
}

.blur {
  filter: blur(5px);
  pointer-events: none;
  user-select: none;
}
</style> 