<script setup lang="ts">
import { toRefs , defineProps } from 'vue';
import { type Event } from '@/types'
import { useRouter } from 'vue-router';
import { useMessageStore } from '@/stores/message';
const props = defineProps<{
    event: Event
    id: String
}>()
const { event } = toRefs(props)
const router = useRouter()
const store = useMessageStore()
const register = () => {
    store.updateMessage('You are succesfully registered for ' + props.event.title)
    setTimeout(() => {
        store.resetMessage()
    }, 3000)
    router.push({ name: 'event-detail-view', params: { id: props.event.id } })
}

</script>
<template>
    <p class="font-bold py-2 px-4 rounded">Register event here</p>
    <button @click="register" class="bg-gray-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">Register</button>
</template>