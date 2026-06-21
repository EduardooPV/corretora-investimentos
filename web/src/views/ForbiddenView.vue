<template>
  <div class="container">
    <div class="card">
      <h1>403</h1>
      <p>Você não tem permissão para acessar esta página.</p>
      <button @click="router.push('/login')">Voltar</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.card {
  background: white;
  padding: 2rem 3rem;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h1 {
  margin: 0;
  font-size: 3rem;
  color: #e53935;
}

p {
  margin: 0;
  color: #666;
}

button {
  padding: 0.75rem 2rem;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: #1557b0;
}
</style>
