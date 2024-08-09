<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue';
import EventService from '@/services/EventService'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)
const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 3)
  return page.value < totalPages
})

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  }
})
const page = computed(() => props.page)
const size = computed(() => props.size)
onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(3, page.value)
    .then((response) => {
      events.value = response.data
      totalEvents.value = parseInt(response.headers['x-total-count'], 10)
    })
    .catch((error) => {
      console.error('There was an error!', error)
    })

  })
})
</script>

<template>
  <h1>Event for good</h1>
  <div class="flex flex-col items-center">
    <EventCard v-for="event in events" :key="event.id" :event="event"></EventCard>
    <div class="flex w-72">
      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        class="flex-1 text-left no-underline text-gray-800"
      >
        Prev Page
      </RouterLink>
      <RouterLink
        :to="{ name: 'event-list-view', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
        class="flex-1 text-right no-underline text-gray-800"
      >
        Next Page
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
</style>
