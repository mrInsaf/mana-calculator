<template>
  <div class="expedition-page" :class="{ 'is-loaded': isLoaded }">
    <header class="header">
      <div class="logo">
        <img src="/зелье без фона.png" alt="Mana" class="mana-icon" />
        <div class="logo-text">
          <h1>MANA</h1>
          <p>Calc</p>
        </div>
      </div>
      <div class="nav-title">{{ isMaster ? 'Экспедиции' : 'Гримуар' }}</div>
      <div class="controls">
        <div class="control-item">
          <img src="/книга без фона.png" alt="Библиотекарь" />
          <span>Библиотекарь</span>
        </div>
        <label class="switch">
          <input type="checkbox" v-model="isMaster">
          <span class="slider"></span>
        </label>
        <div class="control-item">
          <img src="/посох.png" alt="Мастер" />
          <span>Мастер</span>
        </div>
      </div>
    </header>

    <main class="main-container">
      <ExpeditionContent v-if="isMaster" />
      <GrimuarContent v-else />
    </main>
    <div class="glitter"></div>
    <div class="nyan-container">
      <div class="nyan-cat"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ExpeditionContent from '../components/ExpeditionContent.vue'
import GrimuarContent from '../components/GrimuarContent.vue'

const isLoaded = ref(false)
const isMaster = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 100)
})
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
  background: var(--background-light);
  flex: 1;
  padding: 2rem;
  height: calc(100vh - 120px);
}

.glitter {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 300px;
  height: 300px;
  background: url('/блестки.png') no-repeat center/contain;
  pointer-events: none;
  z-index: 1;
}

.nyan-container {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100px;
  height: 100px;
  pointer-events: auto;
  z-index: 2;
}

.nyan-cat {
  width: 100px;
  height: 100px;
  background: url('../../public/nyan-cat.png') no-repeat center/contain;
  position: absolute;
  left: 0px;
  bottom: 0px;
  pointer-events: none;
}

.nyan-container:hover .nyan-cat {
  background-image: url('../../public/nyan-cat2.webp');
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
</style> 