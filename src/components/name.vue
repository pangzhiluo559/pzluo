<script lang="ts" setup>
import { ref } from 'vue';

defineProps({
  name: String
});

// const textColor = ['text-green-500', 'text-red-500', 'text-blue-500', 'text-yellow-500']
const activeClass = 'active'

const textColor = ref(['text-green-600', 'text-red-500', 'text-blue-800', 'text-yellow-500','text-purple-500'])

const index = ref(0)

setInterval(() => {
  index.value = (index.value + 1) % 5
}, 500)
</script>


<template>
    <!-- <div class="relative w-32 mx-auto">
        <div class="relative text-center text-4xl font-bold" :class="textColor[index]">{{name}}</div>
        <div class="line absolute top-4 left-4 w-10 h-0.5 bg-white"></div>
        <div class="line absolute top-5 left-20 w-12 h-0.5 bg-white"></div>
        <div class="line absolute top-8 left-2 w-10 h-0.5 bg-white"></div>
    </div> -->


    <div class="text-4xl font-bold text-gray-600">
      Hello! My name is <a>{{name}}</a> !
    </div>
</template>

<style scoped>

</style>
