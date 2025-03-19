<template>
  <div class="task-card" @click="$emit('click')">
    <h4>{{ task.title }}</h4>
    <div class="task-info">
      <span class="difficulty">{{ task.difficulty }}</span>
      <span class="mana">Мана: {{ task.mana }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  task: {
    type: Object,
    required: true,
    validator: (task) => {
      return task.title && task.difficulty && task.mana !== undefined
    }
  }
})
</script>

<style scoped>
.task-card {
  background: rgba(139, 111, 255, 0.1);
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--primary-color);
  cursor: pointer;
  transition: all 0.2s ease;
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

.task-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

.difficulty {
  color: var(--primary-light);
}

.mana {
  color: var(--primary-light);
  opacity: 0.8;
}
</style> 