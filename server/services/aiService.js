// server/services/aiService.js
import axios from "axios";
import { questionPrompt, planPrompt } from "../prompts/prompts.js";

// Ollama local server URL
const OLLAMA_URL = "http://localhost:11434/v1/generate";

// Call Ollama
async function callOllama(prompt, maxTokens = 500) {
  try {
    const response = await axios.post(
      OLLAMA_URL,
      { prompt, max_tokens: maxTokens },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data.output_text || "";
  } catch (err) {
    console.error("Ollama Error:", err.message);
    throw new Error("Ollama request failed. Make sure the Ollama server is running.");
  }
}

// Generate follow-up questions
export async function generateQuestions(input, userKey, provider) {
  if (!provider) throw new Error("Provider is required.");

  const prompt = questionPrompt(input);

  if (provider === "ollama") {
    return await callOllama(prompt, 500);
  }

  if (!userKey) throw new Error("API key required for cloud providers.");

  if (provider === "openai") {
    const { OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: userKey });
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0].message.content;

  } else if (provider === "huggingface") {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/gpt2",
      { inputs: prompt },
      { headers: { Authorization: `Bearer ${userKey}` } }
    );
    return response.data[0].generated_text || "";

  } else if (provider === "claude") {
    const response = await axios.post(
      "https://api.anthropic.com/v1/complete",
      { prompt, model: "claude-v1", max_tokens_to_sample: 500 },
      { headers: { "X-API-Key": userKey } }
    );
    return response.data.completion || "";

  } else if (provider === "gemini") {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate",
      { prompt: { text: prompt }, temperature: 0.7, maxOutputTokens: 500 },
      { headers: { Authorization: `Bearer ${userKey}` } }
    );
    return response.data.candidates?.[0]?.output || "";

  } else {
    throw new Error("Unsupported provider.");
  }
}

// Generate full lesson plan
export async function generatePlan(data, userKey, provider) {
  if (!provider) throw new Error("Provider is required.");

  const prompt = planPrompt(data);

  if (provider === "ollama") {
    return await callOllama(prompt, 1000);
  }

  if (!userKey) throw new Error("API key required for cloud providers.");

  if (provider === "openai") {
    const { OpenAI } = await import("openai");
    const client = new OpenAI({ apiKey: userKey });
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });
    return response.choices[0].message.content;

  } else if (provider === "huggingface") {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/gpt2",
      { inputs: prompt },
      { headers: { Authorization: `Bearer ${userKey}` } }
    );
    return response.data[0].generated_text || "";

  } else if (provider === "claude") {
    const response = await axios.post(
      "https://api.anthropic.com/v1/complete",
      { prompt, model: "claude-v1", max_tokens_to_sample: 1000 },
      { headers: { "X-API-Key": userKey } }
    );
    return response.data.completion || "";

  } else if (provider === "gemini") {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate",
      { prompt: { text: prompt }, temperature: 0.7, maxOutputTokens: 1000 },
      { headers: { Authorization: `Bearer ${userKey}` } }
    );
    return response.data.candidates?.[0]?.output || "";

  } else {
    throw new Error("Unsupported provider.");
  }
}