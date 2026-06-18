<template>
  <section class="orders-page">
    <h1 class="title">Lista de ordens</h1>

    <div v-if="orders.length > 0" class="orders-grid">
      <article v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-card__header">
          <span class="order-card__id">#{{ order.id }}</span>
          <span class="order-card__type">{{ order.type }}</span>
        </div>
        <div class="order-card__body">
          <p class="order-card__item"><strong>Ativo:</strong> {{ order.assetName }}</p>
          <p class="order-card__item"><strong>Quantidade:</strong> {{ order.quantity }}</p>
          <p class="order-card__status">
            <strong>Status:</strong>
            <span :class="['status-pill', order.status.toLowerCase()]">{{ order.status }}</span>
          </p>
        </div>
      </article>
    </div>

    <p v-else class="empty-message">Não há ordens para exibir.</p>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getOrders } from '../services/orders.service';
import type { IOrderResponse } from '../types/order';

const orders = ref<IOrderResponse[]>([]);

const fetchOrders = async () => {
  try {
    const response = await getOrders();
    orders.value = response;
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchOrders);
</script>

<style scoped>
.orders-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 1.9rem;
  margin-bottom: 18px;
  color: #1f2937;
}

.orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 18px;
}

.order-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
  padding: 18px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.order-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 18px 30px rgba(15, 23, 42, 0.14);
}

.order-card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.order-card__id {
  font-weight: 700;
  color: #111827;
}

.order-card__type {
  background: #eef2ff;
  color: #4338ca;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 0.85rem;
}

.order-card__body {
  display: grid;
  gap: 8px;
}

.order-card__item,
.order-card__status {
  margin: 0;
  color: #374151;
}

.order-card__status {
  display: flex;
  gap: 8px;
  align-items: center;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: capitalize;
}

.status-pill.pending {
  background: #fef3c7;
  color: #b45309;
}

.status-pill.processing {
  background: #dbeafe;
  color: #0c4a6e;
}

.status-pill.executed {
  background: #dcfce7;
  color: #166534;
}

.status-pill.failed {
  background: #fee2e2;
  color: #991b1b;
}

.empty-message {
  color: #6b7280;
  font-size: 1rem;
  margin-top: 16px;
}
</style>
