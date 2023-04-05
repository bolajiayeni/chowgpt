<template>
  <div class="container mx-auto p-4 max-w-[80vw]">
    <h1 class="text-4xl font-bold mb-8 border-b-4 border-gray-500">
      ChowGPT 🥘
    </h1>
    <IngredientForm @submit="fetchRecipes" v-if="!selectedRecipe" />
    <RecipeList
      :recipes="recipes"
      @select="selectRecipe"
      v-if="!selectedRecipe && recipes.length"
    />
    <RecipeDetails
      :recipe="selectedRecipe"
      @back="selectedRecipe = null"
      v-else
    />
  </div>
</template>

<script>
sssss
// Exports
export default {
  data() {
    return {
      recipes: [],
      selectedRecipe: null
    }
  },

  methods: {
    async fetchRecipes(query) {
      const response = await this.$axios.get(
        `complexSearch?apiKey=${process.env.VUE_APP_SPOONACULAR_API_KEY}&${query}`
      )
      this.recipes = response.data.results
    },

    async fetchRecipeDetails(id) {
      const response = await this.$axios.get(
        `${id}/information?apiKey=${process.env.VUE_APP_SPOONACULAR_API_KEY}`
      )
      const data = response.data
      return {
        id: data.id,
        title: data.title,
        image: data.image,
        ingredients: data.extendedIngredients,
        instructions: data.analyzedInstructions[0]?.steps
          .map((step) => `<p>${step.number}. ${step.step}</p>`)
          .join('')
      }
    },

    async selectRecipe(id) {
      this.selectedRecipe = await this.fetchRecipeDetails(id)
    }
  }
}
</script>
