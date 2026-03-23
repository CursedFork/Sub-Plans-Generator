// server/routes/aiRoutes.js
import express from "express";
import { generateQuestions, generatePlan } from "../services/aiService.js";

const router = express.Router();

router.post("/questions", async (req, res) => {
  try {
    const { input, apiKey, provider } = req.body;
    const result = await generateQuestions(input, apiKey, provider);
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

router.post("/plan", async (req, res) => {
  try {
    const { data, apiKey, provider } = req.body;
    const result = await generatePlan(data, apiKey, provider);
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

export default router;