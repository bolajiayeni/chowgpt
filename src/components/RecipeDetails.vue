<template>
    <div v-if="recipe">
      <button @click="$emit('back')" class="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 mt-4 rounded mb-4">Back</button>
      <h2 class="text-2xl font-semibold mb-4 text-warm-gray-700">{{ recipe.title }}</h2>
      <img :src="recipe.imageUrl" alt="Recipe Image" class="w-full h-64 object-cover mb-8" />
      <!-- ingredients -->
    <h3 class="text-xl font-semibold mb-2 text-warm-gray-700">Ingredients:</h3>
    <ul class="list-disc list-inside mb-4">
      <li v-for="ingredient in recipe.ingredients" :key="ingredient.id">
        {{ ingredient.original }}
      </li>
    </ul>

    <!-- instructions -->
    <h3 class="text-xl font-semibold mb-2 text-warm-gray-700">Instructions:</h3>
    <div v-html="recipe.instructions"></div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      recipe: {
        type: Object,
        default: null,
      },
    },
  };
  </script>
  