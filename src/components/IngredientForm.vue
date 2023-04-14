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
          v-model="preferences"
          class="w-full p-2 border rounded focus:border-warm-gray-500 focus:ring-1 focus:ring-warm-gray-500"
          type="text"
          placeholder="Enter meal preferences separated by comma"
        />
      </div>
    </div>
    <div class="flex flex-wrap -mx-2 mb-4">
      <div class="w-full px-2">
        <input
          type="checkbox"
          id="onlyTheseIngredients"
          v-model="onlyTheseIngredients"
        />
        <label class="ml-2 text-warm-gray-700" for="onlyTheseIngredients"
          >I have only these ingredients</label
        >
      </div>
    </div>
    <button
      class="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
    >
      Search
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      ingredients: "",
      preferences: "",
      onlyTheseIngredients: false,
    };
  },

  methods: {
    submitForm(e) {
      e.preventDefault();

      if (!this.ingredients.trim()) {
        return;
      }

      const query = {
        ingredients: this.ingredients.trim(),
        preferences: this.preferences.trim(),
        onlyTheseIngredients: this.onlyTheseIngredients,
      };

      this.$emit("submit-query", query);

      this.ingredients = "";
      this.preferences = "";
      this.onlyTheseIngredients = false;
    },
  },
};
</script>
