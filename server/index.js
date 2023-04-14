require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");


const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiKey = process.env.OPENAI_API_KEY;
const chatGptUrl = "https://api.openai.com/v1/chat/completions";
const chatGptModel = "gpt-3.5-turbo";

app.post("/api/generate-recipes", async (req, res) => {
  const { ingredients, preferences, onlyTheseIngredients } = req.body;
  const ingredientsText = onlyTheseIngredients
    ? `only ${ingredients}`
    : ingredients;

  const messages = [
    {
      role: "system",
      content: `Generate a list of 5 unique recipes using ${ingredientsText} with the following preferences: ${preferences}. Please format each recipe as follows: |Title|: <title>, |Ingredients|: <ingredients>, |Directions|: <directions>.`,
    },
  ];

  try {
    const response = await axios.post(
      chatGptUrl,
      {
        model: chatGptModel,
        messages,
        max_tokens: 1000,
        n: 1,
        temperature: 0.8,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    console.log("OpenAI API response:", response.data);

    const assistantMessages = response.data.choices[0].message.content.trim();

    const recipeRegex =
      /\|Title\|: (.*?), \|Ingredients\|: (.*?), \|Directions\|: (.*?)(?=\|Title\||$)/gs;
    const recipes = [];

    let match;
    while ((match = recipeRegex.exec(assistantMessages)) !== null) {
      const title = match[1];
      const ingredients = match[2];
      const directions = match[3];
      const imageUrl = `https://source.unsplash.com/featured/?food,recipe${recipes.length}`;
      recipes.push({ title, ingredients, directions, imageUrl });
    }

    console.log("Generated recipes:", recipes);

    res.json({ recipes });
  } catch (error) {
    console.error("OpenAI API error:", error.response?.data || error.message);
    res
      .status(500)
      .json({ message: "An error occurred while generating recipes." });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
