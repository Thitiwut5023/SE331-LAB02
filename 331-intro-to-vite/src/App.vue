<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import EventCard from './components/EventCard.vue'
import { useMessageStore } from './stores/message';
import { storeToRefs } from 'pinia';
const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialias">
    <header>
      <div id="flashMessage" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav class="py-6">
          <RouterLink class="font-bold text-gray-700" :to="{name: 'event-list-view', query: { page: 1, size: 2 }}">Event</RouterLink> |
          <RouterLink class="font-bold text-gray-700" :to="{name: 'student'}">Students</RouterLink> |
          <RouterLink class="font-bold text-gray-700" :to="{name: 'about'}">About</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style>

nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}

h2 {
  font-size: 20px;
}

@keyframes yellofade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}
#flahMessage {
  animation: yellofade 3s ease-in-out;
}
</style>
