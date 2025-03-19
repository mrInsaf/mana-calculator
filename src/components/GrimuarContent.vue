<template>
  <div class="grimuar-content">
    <div class="subtasks-section">
      <div class="subtasks-header">
        <h3>Список подзадач</h3>
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
          v-for="(subtask, index) in subtasks" 
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

    <button class="save-button" @click="save">Сохранить</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const subtasks = ref([
  {
    name: 'Разработка брони',
    level: 'Средний',
    type: 'Изменение',
    strategy: 7,
    magic: 1,
    combat: 5
  }
])

const addSubtask = () => {
  subtasks.value.push({
    name: '',
    level: 'Средний',
    type: 'Изменение',
    strategy: 0,
    magic: 0,
    combat: 0
  })
}

const save = () => {
  // TODO: Implement save functionality
  console.log('Saving subtasks:', subtasks.value)
}
</script>

<style scoped>
.grimuar-content {
  padding: 2rem;
  background: var(--container-background);
  border-radius: 1rem;
  height: 100%;
  overflow-y: auto;
  position: relative;
}

.subtasks-section {
  margin-bottom: 2rem;
}

.subtasks-header {
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

.add-subtask {
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

.subtasks-table {
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: var(--primary-light);
  color: white;
  font-size: 1.2rem;
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: 1rem;
  padding: 0.5rem 1rem;
  background: var(--primary-color);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.subtask-input, .subtask-select {
  width: 100%;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-family: 'Pixelizer', sans-serif;
}

.subtask-input.number {
  text-align: center;
}

.subtask-select {
  cursor: pointer;
}

.save-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: var(--primary-light);
  color: white;
  border: none;
  padding: 1rem 3rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  font-family: 'Pixelizer', sans-serif;
  transition: all 0.2s ease;
}

.save-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(139, 111, 255, 0.3);
}
</style> 