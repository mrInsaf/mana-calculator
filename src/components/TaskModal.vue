<template>
  <div class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <div class="form-group">
        <label>Название задачи</label>
        <input 
          type="text" 
          v-model="taskData.name" 
          class="input-field"
        />
      </div>

      <div class="form-group">
        <label>Описание экспедиции</label>
        <textarea 
          v-model="taskData.description" 
          class="input-field"
        ></textarea>
      </div>

      <div class="form-actions">
        <button 
          class="create-task-button" 
          @click="createTask"
          :disabled="!taskData.name || !taskData.description"
        >
          Создать задачу
        </button>
      </div>

      <div class="subtasks-section">
        <div class="subtasks-header">
          <h3>Подзадачи</h3>
          <button class="add-subtask" @click="addSubtask">+</button>
        </div>

        <div class="subtasks-table">
          <div class="table-header">
            <div>Название</div>
            <div>Уровень</div>
            <div>Тип</div>
            <div>Стратегия</div>
            <div>Магия</div>
            <div>Бой</div>
          </div>
          <div 
            v-for="(subtask, index) in taskData.subtasks" 
            :key="index" 
            class="table-row"
          >
            <div>{{ subtask.name }}</div>
            <div>{{ subtask.level }}</div>
            <div>{{ subtask.type }}</div>
            <div>{{ subtask.strategy }}</div>
            <div>{{ subtask.magic }}</div>
            <div>{{ subtask.combat }}</div>
          </div>
        </div>
      </div>

      <div v-if="showBacklog" class="backlog-list">
        <h3>Список подзадач</h3>
        <div class="table-header">
          <div>Название</div>
          <div>Уровень</div>
          <div>Тип</div>
          <div>Стратегия</div>
          <div>Магия</div>
          <div>Бой</div>
        </div>
        <div v-for="backlogTask in backlogTasks" :key="backlogTask.id" class="table-row" @click="selectBacklogTask(backlogTask)">
          <div>{{ backlogTask.name }}</div>
          <div>{{ backlogTask.difficult }}</div>
          <div>{{ backlogTask.type }}</div>
          <div>{{ backlogTask.manaStrat }}</div>
          <div>{{ backlogTask.manaMagic }}</div>
          <div>{{ backlogTask.manaBattle }}</div>
        </div>
      </div>

      <div class="modal-actions">
        <button class="save-button" @click="save" :disabled="!taskData.id">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { expeditionsApi } from '../api/expeditions'

const emit = defineEmits(['close', 'save'])

const props = defineProps({
  expeditionId: {
    type: Number,
    required: true
  }
})

const taskData = ref({
  name: '',
  description: '',
  subtasks: []
})

const backlogTasks = ref([])
const showBacklog = ref(false)

const closeModal = () => {
  emit('close')
}

const handleEscape = (e) => {
  if (e.key === 'Escape') {
    closeModal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})

const addSubtask = async () => {
  showBacklog.value = true
  try {
    console.log('Загружаем список подзадач из бэклога...')
    backlogTasks.value = await expeditionsApi.getBacklog()
    console.log('Полученные подзадачи из бэклога:', backlogTasks.value)
    console.log('URL запроса:', expeditionsApi.getBacklog.toString())
  } catch (error) {
    console.error('Ошибка при загрузке бэклога:', error)
    console.log('Детали запроса:', error.config)
    console.log('Заголовки запроса:', error.config?.headers)
  }
}

const selectBacklogTask = async (backlogTask) => {
  try {
    console.log('Добавляем подзадачу из бэклога:', backlogTask)
    const result = await expeditionsApi.addSubtaskFromBacklog(taskData.value.id, backlogTask.id)
    console.log('Подзадача успешно добавлена:', result)
    
    taskData.value.subtasks.push({
      name: backlogTask.name,
      type: backlogTask.type,
      difficult: backlogTask.difficult,
      strategy: backlogTask.manaStrat,
      magic: backlogTask.manaMagic,
      combat: backlogTask.manaBattle,
      checked: false
    })
    showBacklog.value = false
  } catch (error) {
    console.error('Ошибка при добавлении подзадачи:', error)
    // Можно добавить отображение ошибки пользователю
  }
}

const createTask = async () => {
  try {
    const result = await expeditionsApi.createTask({
      idExpedition: props.expeditionId,
      name: taskData.value.name,
      description: taskData.value.description
    })
    console.log('Задача создана:', result)
    taskData.value.id = result.id
  } catch (error) {
    console.error('Ошибка при создании задачи:', error)
  }
}

const save = () => {
  if (!taskData.value.id) {
    console.warn('Нельзя сохранить подзадачи без создания задачи')
    return
  }
  emit('save', taskData.value)
  closeModal()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: var(--container-background);
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  margin: auto;
  font-family: 'Pixelizer', sans-serif;
}

.modal-content h3 {
  font-size: 2rem;
  color: var(--primary-light);
  margin: 0;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--primary-light);
  font-size: 1.5rem;
  font-family: 'Pixelizer', sans-serif;
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

.form-actions {
  display: flex;
  justify-content: flex-end;
  margin: 1rem 0;
}

.create-task-button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-family: 'Pixelizer', sans-serif;
}

.create-task-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.create-task-button:not(:disabled):hover {
  background: var(--primary-light);
}

.save-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.subtasks-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.add-subtask {
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

.subtasks-table {
  background: rgba(139, 111, 255, 0.15);
  border-radius: 0.5rem;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: 0.5rem;
  padding: 1rem;
  background: var(--primary-color);
  color: white;
  font-size: 1rem;
  font-family: 'Pixelizer', sans-serif;
}

.table-header > div {
  text-align: center;
}

.table-header > div:first-child {
  text-align: left;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid rgba(139, 111, 255, 0.2);
}

.table-row > div {
  padding: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-color-dark);
}

.table-row > div:not(:first-child) {
  justify-content: center;
}

.subtask-input {
  background: transparent;
  border: 1px solid var(--primary-color);
  border-radius: 0.25rem;
  padding: 0.5rem;
  color: var(--text-color-dark);
  font-family: 'Pixelizer', sans-serif;
  font-size: 0.9rem;
}

.subtask-input.number {
  text-align: center;
}

.subtask-select {
  background: transparent;
  border: 1px solid var(--text-color-dark);
  border-radius: 0.25rem;
  padding: 0.5rem;
  color: var(--text-color-dark);
  font-family: 'Pixelizer', sans-serif;
  font-size: 0.9rem;
}

.modal-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
}

.save-button {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-family: 'Pixelizer', sans-serif;
}

.save-button:hover {
  background: var(--primary-light);
}

.backlog-list {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--container-background);
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;
  width: 90%;
  max-width: 800px;
  z-index: 1000;
  color: var(--text-color-dark);
}

.backlog-list h3 {
  color: var(--primary-light);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.backlog-list .table-row {
  cursor: pointer;
  transition: background-color 0.2s;
  color: var(--text-color-dark);
}

.backlog-list .table-row:hover {
  background-color: rgba(139, 111, 255, 0.1);
}

.backlog-list .table-header {
  background: var(--primary-color);
  color: white;
}
</style>

@font-face {
  font-family: 'Pixelizer';
  src: url('/PixelizerBold.ttf') format('truetype');
} 