<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="form-group">
        <label>Название задачи</label>
        <input 
          type="text" 
          v-model="taskData.title" 
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
            <input type="text" v-model="subtask.name" class="subtask-input" />
            <select v-model="subtask.level" class="subtask-select">
              <option>Лёгкий</option>
              <option>Средний</option>
              <option>Сложный</option>
            </select>
            <select v-model="subtask.type" class="subtask-select">
              <option>Изменение</option>
              <option>Поиск</option>
              <option>Создание</option>
            </select>
            <input type="number" v-model="subtask.strategy" class="subtask-input number" />
            <input type="number" v-model="subtask.magic" class="subtask-input number" />
            <input type="number" v-model="subtask.combat" class="subtask-input number" />
          </div>
        </div>
      </div>

      <div class="modal-actions">
        <button class="save-button" @click="save">Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close', 'save'])

const taskData = ref({
  title: '',
  description: '',
  subtasks: []
})

const addSubtask = () => {
  taskData.value.subtasks.push({
    name: '',
    level: 'Лёгкий',
    type: 'Изменение',
    strategy: 0,
    magic: 0,
    combat: 0
  })
}

const save = () => {
  emit('save', taskData.value)
  emit('close')
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

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: 0.5rem;
  padding: 0.5rem;
  border-bottom: 1px solid rgba(139, 111, 255, 0.2);
}

.subtask-input {
  background: transparent;
  border: 1px solid var(--primary-color);
  border-radius: 0.25rem;
  padding: 0.5rem;
  color: white;
  font-family: 'Pixelizer', sans-serif;
  font-size: 0.9rem;
}

.subtask-input.number {
  text-align: center;
}

.subtask-select {
  background: transparent;
  border: 1px solid var(--primary-color);
  border-radius: 0.25rem;
  padding: 0.5rem;
  color: white;
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
</style>

@font-face {
  font-family: 'Pixelizer';
  src: url('/PixelizerBold.ttf') format('truetype');
} 