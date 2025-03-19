<template>
  <div class="expedition-content">
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
    v-if="isTaskModalOpen" 
    @close="isTaskModalOpen = false"
    @save="handleTaskSave"
  />
</template>

<script setup>
import { ref } from 'vue'
import TaskCard from './TaskCard.vue'
import TaskModal from './TaskModal.vue'

const currentExpedition = ref(null)
const expeditions = ref([
  {
    id: 1,
    name: 'Экспедиция 1: Проба пера',
    description: 'Короче, Меченый, я тебя спас и в благородство играть не буду: выполнишь для меня пару заданий – и мы в расчете.',
    tasks: [
      { id: 1, title: 'Task-01 Разработка защитных чар', difficulty: 'Легкий', mana: 9 },
      { id: 2, title: 'Task-02 Разработка защитных чар', difficulty: 'Легкий', mana: 14 },
      { id: 3, title: 'Task-03 Разработка защитных чар', difficulty: 'Средний', mana: 21 },
      { id: 4, title: 'Task-04 Разработка защитных чар', difficulty: 'Средний', mana: 23 },
      { id: 5, title: 'Task-05 Разработка защитных чар', difficulty: 'Средний', mana: 28 }
    ]
  }
])

const isTaskModalOpen = ref(false)

const selectExpedition = (expedition) => {
  currentExpedition.value = expedition
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

const deleteExpedition = () => {
  if (!currentExpedition.value) return
  
  const index = expeditions.value.findIndex(e => e.id === currentExpedition.value.id)
  if (index !== -1) {
    expeditions.value.splice(index, 1)
    currentExpedition.value = expeditions.value[0] || null
  }
}

const addTask = () => {
  isTaskModalOpen.value = true
}

const handleTaskSave = (taskData) => {
  if (!currentExpedition.value) return

  const newTask = {
    id: currentExpedition.value.tasks.length + 1,
    title: taskData.title,
    description: taskData.description,
    subtasks: taskData.subtasks
  }
  currentExpedition.value.tasks.push(newTask)
}

const editTask = (task) => {
  // TODO: Implement task editing
}

const saveExpedition = () => {
  // TODO: Implement expedition saving
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
  background: rgba(139, 111, 255, 0.15);
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
  background: var(--primary-color);
  border: none;
  border-radius: 0.5rem;
  color: white;
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
</style> 