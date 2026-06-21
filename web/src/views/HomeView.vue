<template>
  <div class="container">
    <div class="card">
      <h1>Bem-vindo</h1>
      <p>O que você deseja acessar?</p>
      <div class="actions">
        <button @click="router.push('/profile')">Meu Perfil</button>
        <button @click="handleOrders" class="admin">Ordens (Admin)</button>
      </div>
      <p v-if="accessDenied" class="error">Você não tem permissão para acessar esta área.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getUserRoles } from '../auth/auth.service';

const router = useRouter();
const accessDenied = ref(false);

function handleOrders() {
  const roles = getUserRoles();
  if (roles.includes('admin')) {
    router.push('/orders');
  } else {
    accessDenied.value = true;
  }
}
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
  min-width: 320px;
}

h1 {
  margin: 0;
  font-size: 1.8rem;
  color: #1a1a1a;
}

p {
  margin: 0;
  color: #666;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
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

button.admin {
  background-color: #e53935;
}

button.admin:hover {
  background-color: #b71c1c;
}

.error {
  color: #e53935;
  font-size: 0.9rem;
  margin: 0;
}
</style>
