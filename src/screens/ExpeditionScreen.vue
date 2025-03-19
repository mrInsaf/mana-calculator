<template>
  <div class="expedition-page" :class="{ 'is-loaded': isLoaded, 'blur': isTaskModalOpen }">
    <header class="header">
      <div class="logo">
        <img src="/зелье без фона.png" alt="Mana" class="mana-icon" />
        <div class="logo-text">
          <h1>MANA</h1>
          <p>Calc</p>
        </div>
      </div>
      <div class="nav-title">Экспедиция</div>
      <div class="controls">
        <div class="control-item">
          <img src="/книга без фона.png" alt="Библиотекарь" />
          <span>Библиотекарь</span>
        </div>
        <label class="switch">
          <input type="checkbox" v-model="isLibrarian">
          <span class="slider"></span>
        </label>
        <div class="control-item">
          <img src="/посох.png" alt="Мастер" />
          <span>Мастер</span>
        </div>
      </div>
    </header>

    <main class="main-container">
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
    </main>
    <div class="glitter"></div>
    <div class="nyan-container">
      <div class="nyan-cat"></div>
    </div>
  </div>
  <TaskModal 
    v-if="isTaskModalOpen" 
    @close="isTaskModalOpen = false"
    @save="handleTaskSave"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TaskCard from '../components/TaskCard.vue'
import TaskModal from '../components/TaskModal.vue'

const isLoaded = ref(false)
const isLibrarian = ref(false)
const currentExpedition = ref(null)
const expeditions = ref([
  // {
  //   id: 1,
  //   name: 'Экспедиция 1: Проба пера',
  //   description: 'Короче, Меченый, я тебя спас и в благородство играть не буду: выполнишь для меня пару заданий – и мы в расчете.',
  //   tasks: [
  //     { id: 1, title: 'Task-01 Разработка защитных чар', difficulty: 'Легкий', mana: 9 },
  //     { id: 2, title: 'Task-02 Разработка защитных чар', difficulty: 'Легкий', mana: 14 },
  //     { id: 3, title: 'Task-03 Разработка защитных чар', difficulty: 'Средний', mana: 21 },
  //     { id: 4, title: 'Task-04 Разработка защитных чар', difficulty: 'Средний', mana: 23 },
  //     { id: 5, title: 'Task-05 Разработка защитных чар', difficulty: 'Средний', mana: 28 }
  //   ]
  // }
])

const isTaskModalOpen = ref(false)

onMounted(() => {
  isLoaded.value = true
  currentExpedition.value = expeditions.value[0]
})

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

const editExpedition = () => {
  // TODO: Implement expedition editing
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
@font-face {
  font-family: 'Pixelizer';
  src: url('/PixelizerBold.ttf') format('truetype');
}

.expedition-page {
  min-height: 100vh;
  background: var(--background);
  color: var(--text-color);
  font-family: 'Pixelizer', sans-serif;
  display: flex;
  flex-direction: column;
}

.glitter {
  position: fixed; /* Фиксированное положение относительно экрана */
  bottom: -20px; /* Отступ снизу */
  width: 350px; /* Ширина блесток */
  height: 350px; /* Высота блесток */
  background-image: url('/блестки.png');
  background-size: contain; /* Сохраняет пропорции изображения */
  background-repeat: no-repeat;
  z-index: 1; /* Чтобы блестки не перекрывали важные элементы */
  pointer-events: none; /* Клики проходят сквозь элемент */
}

.nyan-container {
  position: fixed;
  bottom: -20px;
  left: 0px;
  width: 100px;
  height: 100px;
  pointer-events: auto; /* Включаем взаимодействие для контейнера */
}

.nyan-container:hover .nyan-cat {
  background-image: url('../../public/nyan-cat2.webp');
}

/* Нянкет */
.nyan-cat {
  position: fixed;
  bottom: -20px;
  left: 0px;
  width: 100px;
  height: 100px;
  background-image: url('../../public/nyan-cat.png');
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 2;
  pointer-events: none;
  transition: background-image 0.15s ease-in-out;
}

.header {
  background: var(--primary-color);
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  height: 120px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.mana-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  transition: all 0.15s ease;
}

.mana-icon:hover {
  animation: colorShift 1s infinite ease-in-out;
}

@keyframes colorShift {
  0% {
    filter: hue-rotate(0deg) brightness(1.0);
  }
  25% {
    filter: hue-rotate(15deg) brightness(1.2);
  }
  50% {
    filter: hue-rotate(-15deg) brightness(1.1);
  }
  75% {
    filter: hue-rotate(10deg) brightness(1.2);
  }
  100% {
    filter: hue-rotate(0deg) brightness(1.0);
  }
}

h3 {
  font-size: 2rem;
  color: var(--primary-light);
}

label {
  font-size: 2rem;
  color: var(--primary-light);
}

.logo-text {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.logo-text h1 {
  margin: 0;
  font-size: 2rem;
}

.logo-text p {
  margin: 0;
  font-size: 1rem;
}

.nav-title {
  font-size: 4rem;
  padding: 0.5rem 1rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  z-index: 1;
}

.nav-title::before {
  content: '';
  position: absolute;
  width: 150%;
  height: 100%;
  background: var(--primary-light);
  border-radius: 15px;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  z-index: -1;
  opacity: 0.7;
}

.controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.control-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.control-item img {
  width: 52px;
  height: 52px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--background);
  transition: .4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--primary-light);
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.main-container {
  flex: 1;
  display: flex;
  gap: 2rem;
  padding: 2rem;
  height: calc(100vh - 120px);
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
  background: white;
  padding: 2rem;
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
}

.input-field {
  font-size: 1.25rem;
  width: 100%;
  padding: 0.75rem;
  background: rgba(139, 111, 255, 0.1);
  border: 1px solid var(--primary-color);
  border-radius: 0.5rem;
  color: var(--text-color-dark);
  font-family: 'Pixelizer', sans-serif;
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
  /* justify-content: space-between; */
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.add-task {
  background: var(--primary-color);
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

.add-task:hover {
  background: var(--primary-light);
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
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-family: 'Pixelizer', sans-serif;
  margin-top: 2rem;
  float: right;
}

.save-button:hover {
  background: var(--primary-light);
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