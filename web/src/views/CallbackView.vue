<template>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { handleCallback } from '../auth/auth.service';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(async () => {
  await handleCallback()
  router.push('/orders')
})
</script>