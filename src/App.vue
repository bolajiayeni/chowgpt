<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold mb-8">ChowGPT</h1>
    <IngredientForm @submit="fetchRecipes" v-if="!selectedRecipe" />
    <RecipeList :recipes="recipes" @select="selectRecipe" v-if="!selectedRecipe" />
    <RecipeDetails :recipe="selectedRecipe" @back="selectedRecipe = null" v-else />
  </div>
</template>



<script>
import axios from 'axios';
import IngredientForm from './components/IngredientForm.vue';
import RecipeList from './components/RecipeList.vue';
import RecipeDetails from './components/RecipeDetails.vue';

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
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.VUE_APP_SPOONACULAR_API_KEY}&${query}`
  );
  this.recipes = response.data.results;
},

async fetchRecipeDetails(id) {
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.VUE_APP_SPOONACULAR_API_KEY}`
  );
  const data = response.data;
  return {
    id: data.id,
    title: data.title,
    image: data.image,
    ingredients: data.extendedIngredients,
    instructions: data.analyzedInstructions[0]?.steps
      .map((step) => `<p>${step.number}. ${step.step}</p>`)
      .join(''),
  };
},

async selectRecipe(id) {
    this.selectedRecipe = await this.fetchRecipeDetails(id);
  },

  },
};
</script>


<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
