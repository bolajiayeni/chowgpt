<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-8">ChowGPT</h1>
    <IngredientForm v-on:submit-query="fetchRecipes" />

    <RecipeList
      :recipes="recipes"
      @select="selectRecipe"
      v-if="!selectedRecipe"
    />
    <RecipeDetails
      :recipe="selectedRecipe"
      @back="selectedRecipe = null"
      v-else
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
    };
  },
  methods: {
    async fetchRecipes(query) {
      console.log("fetchRecipes called", query);
      const response = await axios.post("http://localhost:3001/api/generate-recipes", query);


      this.recipes = response.data.recipes.map(({ recipeText, imageUrl }) => {
        const titleMatch = recipeText.match(/^(.*?)\sIngredients/);
        const ingredientsMatch = recipeText.match(
          /Ingredients:\s(.*?)\sInstructions/
        );
        const instructionsMatch = recipeText.match(/Instructions:\s(.*)/);

        const title = titleMatch ? titleMatch[1].trim() : "";
        const ingredients = ingredientsMatch
          ? ingredientsMatch[1]
              .trim()
              .split("-")
              .map((ingredient) => ingredient.trim())
              .filter((ingredient) => ingredient.length > 0)
          : [];
        const instructions = instructionsMatch
          ? instructionsMatch[1]
              .trim()
              .split(/(\d+\.\s)/)
              .filter((_, i) => i % 2 !== 0)
              .map((step, index) => `<p>${index + 1}. ${step}</p>`)
              .join("")
          : "";

        return {
          title,
          ingredients,
          instructions,
          imageUrl,
        };
      });
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
</style>
