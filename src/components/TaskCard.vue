<template>
  <div class="task-card" @click="handleClick" @mouseenter="loadSubtasks" @mouseleave="showSubtasks = false">
    <h4>{{ task.name }}</h4>
    <p class="description">{{ task.description }}</p>
    
    <div v-if="showSubtasks && subtasks && subtasks.length > 0" class="subtasks-tooltip">
      <h5>Подзадачи:</h5>
      <ul>
        <li v-for="subtask in subtasks" :key="subtask.id" class="subtask-item">
          <div class="subtask-name">{{ subtask.name }}</div>
          <div class="subtask-description">{{ subtask.description }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { expeditionsApi } from '../api/expeditions'

const props = defineProps({
  task: {
    type: Object,
    required: true,
    validator: (task) => {
      return task.id && task.name && task.description
    }
  }
})

const emit = defineEmits(['click'])
const subtasks = ref([])
const showSubtasks = ref(false)

const loadSubtasks = async () => {
  try {
    const taskSubtasks = await expeditionsApi.getTaskSubtasks(props.task.id)
    console.log('Загруженные подзадачи при наведении:', taskSubtasks)

    if (!taskSubtasks || taskSubtasks.length === 0) {
      console.log('Нет подзадач для данной задачи при наведении')
      return
    }

    const backlog = await expeditionsApi.getBacklog()
    // Ищем в бэклоге задачи по ID подзадач
    const matchedSubtasks = taskSubtasks.map(subtask => {
      const backlogTask = backlog.find(task => task.id === subtask.id)
      if (backlogTask) {
        return {
          ...backlogTask,
          idTask: subtask.idTask // сохраняем связь с родительской задачей
        }
      }
      return null
    }).filter(Boolean)

    console.log('Сопоставление:', {
      taskSubtasks,
      matchedSubtasks
    })

    subtasks.value = matchedSubtasks
    showSubtasks.value = true
  } catch (error) {
    console.error('Ошибка при загрузке подзадач:', error)
    subtasks.value = []
    showSubtasks.value = false
  }
}

const handleClick = async () => {
  try {
    const taskSubtasks = await expeditionsApi.getTaskSubtasks(props.task.id)
    console.log('Подзадачи текущей задачи:', taskSubtasks)

    if (!taskSubtasks || taskSubtasks.length === 0) {
      console.log('Нет подзадач для данной задачи')
      return
    }

    const backlog = await expeditionsApi.getBacklog()
    console.log('Весь бэклог:', backlog)

    // Ищем в бэклоге задачи по ID подзадач
    const matchedSubtasks = taskSubtasks.map(subtask => {
      const backlogTask = backlog.find(task => task.id === subtask.id)
      if (backlogTask) {
        return {
          ...backlogTask,
          idTask: subtask.idTask // сохраняем связь с родительской задачей
        }
      }
      return null
    }).filter(Boolean)

    console.log('Сопоставление:', {
      taskSubtasks,
      matchedSubtasks
    })

    subtasks.value = matchedSubtasks
    showSubtasks.value = true
    emit('click')
  } catch (error) {
    console.error('Детали ошибки:', error)
    subtasks.value = []
  }
}
</script>

<style scoped>
.task-card {
  background: rgba(139, 111, 255, 0.1);
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--primary-color);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(107, 78, 230, 0.2);
}

.task-card h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: var(--text-color-dark);
}

.description {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-color-dark);
  opacity: 0.8;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.subtasks-tooltip {
  position: absolute;
  top: 100%;
  left: 0;
  background: var(--container-background);
  border: 1px solid var(--primary-color);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 0.5rem;
  z-index: 1000;
  min-width: 200px;
  box-shadow: 0 4px 12px rgba(107, 78, 230, 0.2);
}

.subtasks-tooltip h5 {
  margin: 0 0 0.5rem 0;
  color: var(--text-color-dark);
}

.subtasks-tooltip ul {
  margin: 0;
  padding: 0 0 0 1rem;
  list-style-type: none;
}

.subtasks-tooltip li {
  color: var(--text-color-dark);
  font-size: 0.9rem;
  margin: 0.25rem 0;
}

.subtask-item {
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(139, 111, 255, 0.1);
}

.subtask-item:last-child {
  border-bottom: none;
}

.subtask-name {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.subtask-description {
  font-size: 0.8rem;
  opacity: 0.8;
}
</style> 