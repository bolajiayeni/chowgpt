<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-8">ChowGPT</h1>
    <IngredientForm v-on:submit-query="fetchRecipes" />

    <!-- Loading spinner -->
    <div v-if="isLoading" class="flex justify-center items-center">
      <div class="loader"></div>
    </div>

    <RecipeList
      :recipes="recipes"
      @select="selectRecipe"
      v-if="!selectedRecipe && !isLoading"
    />
    <RecipeDetails
      :recipe="selectedRecipe"
      @back="selectedRecipe = null"
      v-else-if="!isLoading"
    />
  </div>
</template>


<script>
import axios from "axios";
import IngredientForm from "./components/IngredientForm.vue";
import RecipeList from "./components/RecipeList.vue";
import RecipeDetails from "./components/RecipeDetails.vue";

export default {
  components: {
    IngredientForm,
    RecipeList,
    RecipeDetails,
  },
  data() {
    return {
      recipes: [],
      selectedRecipe: null,
      isLoading: false,
    };
  },
  methods: {
    async fetchRecipes(query) {
      this.isLoading = true;
      this.selectedRecipe = null;
  console.log("fetchRecipes called", query);
  const response = await axios.post("http://localhost:3001/api/generate-recipes", query);

  console.log('Server response:', response.data);

  if (response.data && response.data.recipes) {
    this.recipes = response.data.recipes.map(({ title, ingredients, directions, imageUrl }) => {
      imageUrl += `&random=${Math.random()}`; // Add a random parameter to the image URL

      const formattedIngredients = ingredients
        .split(", ")
        .map((ingredient) => ({ original: ingredient }));

      const formattedInstructions = directions
        .split("\n")
        .filter((step) => step.trim().length > 0)
        .map((step, index) => `<p>${index + 1}. ${step}</p>`)
        .join("");

      return {
        title,
        ingredients: formattedIngredients,
        instructions: formattedInstructions,
        imageUrl,
      };
    });
  } else {
    console.error('Unexpected server response. "recipes" property is missing.');
    this.recipes = [];
  }
  this.isLoading = false;
},



    selectRecipe(recipe) {
      this.selectedRecipe = recipe;
    },
  },
};
</script>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

