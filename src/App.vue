<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderView from '@/components/HeaderView.vue'
import FooterView from '@/components/FooterView.vue'

</script>
<template>
  <div class="main">
    <HeaderView></HeaderView>
    <RouterView></RouterView>
  </div>
  <FooterView></FooterView>
</template>

<style>
html, body {
  padding: 0;
  margin: 0;
}

.main {
  width: 100%;
  height: 2500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: white;
}


</style>
