<script setup lang="ts">
import { ref } from 'vue';

defineProps({
  name: String
})
// const textColor = ['text-green-500', 'text-red-500', 'text-blue-500', 'text-yellow-500']
const activeClass = 'active'

const textColor = ref(['text-green-600', 'text-red-500', 'text-blue-800', 'text-yellow-500','text-purple-500'])

const index = ref(0)

setInterval(() => {
  index.value = (index.value + 1) % 5
}, 1000)

</script>


<template>
    <div class="relative w-32 mx-auto">
        <div class="relative text-center text-4xl font-bold" :class="textColor[index]">{{name}}</div>
        <div class="absolute top-4 left-4 w-10 h-0.5 bg-white"></div>
        <div class="absolute top-5 left-20 w-12 h-0.5 bg-white"></div>
        <div class="absolute top-8 left-2 w-10 h-0.5 bg-white"></div>
    </div>
</template>

<style scoped>

</style>
