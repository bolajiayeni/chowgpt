const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const apiKey = "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";
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
      content: `Generate a list of 5 recipes using ${ingredientsText}. Meal preferences: ${preferences}.`,
    },
  ];

  try {
    const response = await axios.post(
      chatGptUrl,
      {
        model: chatGptModel,
        messages,
        max_tokens: 400,
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
  
    const assistantMessages = response.data.choices[0].message.content.trim().split('\n');

    const recipes = assistantMessages.map((recipeText, index) => {
      const imageUrl = `https://source.unsplash.com/featured/?food,recipe${index}`;
      return { recipeText, imageUrl };
    });
  
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
