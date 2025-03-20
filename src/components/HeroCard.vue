<template>
  <div class="hero-card">
    <div class="hero-header">
      <img :src="hero.image" :alt="hero.name" class="hero-image" />
      <div class="hero-info">
        <div class="hero-name">{{ hero.name }}</div>
        <div class="hero-level">lvl {{ hero.level }}</div>
      </div>
    </div>
    <div class="hero-stats">
      <div class="stat-row">
        <span class="stat-label">Стратегия</span>
        <span class="stat-value">{{ hero.strategy }}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Магия</span>
        <span class="stat-value">{{ hero.magic }}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">Бой</span>
        <span class="stat-value">{{ hero.combat }}</span>
      </div>
    </div>
    <div class="hero-count">x{{ hero.count }}</div>
  </div>
</template>

<script setup>
defineProps({
  hero: {
    type: Object,
    required: true,
    validator: (hero) => {
      return hero.name && 
             typeof hero.level === 'number' && 
             typeof hero.strategy === 'number' &&
             typeof hero.magic === 'number' &&
             typeof hero.combat === 'number' &&
             typeof hero.count === 'number'
    }
  }
})
</script>

<style scoped>
.hero-card {
  background: rgba(139, 111, 255, 0.1);
  border-radius: 1rem;
  padding: 1rem;
  width: 250px;
  position: relative;
  font-family: 'Pixelizer', sans-serif;
}

.hero-header {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.hero-image {
  width: 80px;
  height: 80px;
  border-radius: 0.5rem;
  object-fit: cover;
}

.hero-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.hero-name {
  font-size: 1.2rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.hero-level {
  font-size: 1rem;
  color: var(--primary-light);
}

.hero-stats {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-right: 2rem;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  color: var(--text-color);
}

.stat-value {
  color: var(--primary-light);
  font-size: 1.2rem;
}

.hero-count {
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: var(--primary-light);
  font-size: 1.2rem;
}
</style> 