<template>
  <form @submit.prevent="submitForm">
    <div class="flex flex-wrap -mx-2 mb-4">
      <div class="w-full px-2">
        <label class="block mb-2 text-warm-gray-700">Ingredients</label>
        <input
          v-model="ingredients"
          class="w-full p-2 border rounded focus:border-warm-gray-500 focus:ring-1 focus:ring-warm-gray-500"
          type="text"
          placeholder="Enter ingredients separated by comma"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-2 mb-4">
      <div class="w-full px-2">
        <label class="block mb-2 text-warm-gray-700">Meal Preferences</label>
        <input
          v-model="mealPreferences"
          class="w-full p-2 border rounded focus:border-warm-gray-500 focus:ring-1 focus:ring-warm-gray-500"
          type="text"
          placeholder="Enter meal preferences separated by comma"
        />
      </div>
    </div>
    <button class="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded">Search</button>
  </form>
</template>

  
  <script>
  export default {
    data() {
      return {
        ingredients: '',
        mealPreferences: '',
      };
    },
    methods: {
      submitForm() {
        const query = `includeIngredients=${this.ingredients}&intolerances=${this.mealPreferences}`;
        this.$emit('submit', query);
      },
    },
  };
  </script>
  