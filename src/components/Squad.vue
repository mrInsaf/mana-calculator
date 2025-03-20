<template>
  <div class="squad">
    <h2>Отряд</h2>
    <div class="heroes-list">
      <HeroCard 
        v-for="hero in heroes" 
        :key="hero.name" 
        :hero="hero" 
      />
    </div>
    <div class="squad-controls">
      <button class="control-button" @click="$emit('back')">Назад</button>
      <button class="control-button primary" @click="$emit('save')">Сохранить</button>
    </div>
  </div>
</template>

<script setup>
import HeroCard from './HeroCard.vue'

const heroes = [
  {
    name: 'Техномаг',
    level: 1,
    image: '../../public/маг.png',
    strategy: 1,
    magic: 6,
    combat: 3,
    count: 1
  },
  {
    name: 'Прорицатель',
    level: 2,
    image: '/heroes/oracle.png',
    strategy: 10,
    magic: 2,
    combat: 1,
    count: 2
  },
  {
    name: 'Воин',
    level: 3,
    image: '/воин.png',
    strategy: 1,
    magic: 1,
    combat: 23,
    count: 1
  }
]

defineEmits(['back', 'save'])
</script>

<style scoped>
.squad {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
}

h2 {
  font-size: 2.5rem;
  color: var(--primary-light);
  margin: 0;
  font-family: 'Pixelizer', sans-serif;
}

.heroes-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.squad-controls {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
}

.control-button {
  padding: 1rem 3rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  font-family: 'Pixelizer', sans-serif;
  border: none;
  background: rgba(139, 111, 255, 0.1);
  color: var(--text-color);
  transition: all 0.2s ease;
}

.control-button:hover {
  transform: translateY(-2px);
}

.control-button.primary {
  background: var(--primary-light);
  color: white;
}
</style> 