
const router = require('express').Router();
const auth = require('../middleware/auth');
const Recipe = require('../models/recipe.model');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.route('/generate').post(auth, async (req, res) => {
  try {
    const { ingredients } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest"});

    const prompt = `You are a smart recipe assistant. I have the following ingredients: ${ingredients.join(', ')}.
    Suggest 2 delicious and practical recipes I can make using them. 
    For each recipe, include:
    1. A "recipeTitle" string.
    2. An "estimatedPreparationTime" string.
    3. A "stepByStepInstructions" string.
    4. A "requiredIngredients" array of strings.
    5. An optional "funCookingTip" string.
    
    Respond with a single JSON array containing the two recipe objects. The entire response should be a single JSON code block. For example:
    \`\`\`json
    [
      { "recipeTitle": "...", "estimatedPreparationTime": "...", ... },
      { "recipeTitle": "...", "estimatedPreparationTime": "...", ... }
    ]
    \`\`\``;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = await response.text();

    // Clean the response to reliably extract the JSON part.
    // This handles cases where the AI includes markdown like ```json ... ```
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      text = jsonMatch[1];
    }

    try {
      // Safely parse the cleaned text
      const recipes = JSON.parse(text);
      res.json(recipes);
    } catch (parseError) {
      console.error("--- Failed to parse JSON from Gemini ---");
      console.error("Raw text received:", text);
      console.error("Parse error:", parseError);
      res.status(500).json({ error: "The AI returned an invalid format. Please try generating again." });
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    res.status(500).json({ error: error.message });
  }
});

router.route('/').post(auth, async (req, res) => {
  try {
    const { title, preparationTime, instructions, ingredients } = req.body;
    const newRecipe = new Recipe({
      title,
      preparationTime,
      instructions,
      ingredients,
      createdBy: req.user
    });

    const savedRecipe = await newRecipe.save();
    res.json(savedRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route('/').get(auth, async (req, res) => {
  try {
    const recipes = await Recipe.find({ createdBy: req.user });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
