<template>
    <div>
      <h2 class="text-2xl font-semibold mb-4 text-warm-gray-700">Recipes</h2>
      <ul>
        <li v-for="recipe in recipes" :key="recipe.id" class="mb-4 cursor-pointer" @click="$emit('select', recipe.id)">
          <a :href="recipe.sourceUrl" target="_blank" rel="noopener noreferrer">
            <div class="bg-white p-4 rounded-lg shadow-md">
              <h3 class="text-xl font-semibold mb-2">{{ recipe.title }}</h3>
              <img :src="recipe.image" :alt="recipe.title" class="w-full h-56 object-cover rounded-lg" />
            </div>
          </a>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      recipes: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  