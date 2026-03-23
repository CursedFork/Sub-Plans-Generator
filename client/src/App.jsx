// client/src/App.jsx
import { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [userKey, setUserKey] = useState("");
  const [provider, setProvider] = useState("openai");
  const [questions, setQuestions] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateQuestions = async () => {
    if (!userKey && provider !== "ollama") {
      setError("Please enter your API key.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      setQuestions("");
      setPlan("");
      const res = await axios.post("http://localhost:5000/api/ai/questions", {
        input,
        apiKey: userKey,
        provider,
      });
      setQuestions(res.data.result);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePlan = async () => {
    if (!userKey && provider !== "ollama") {
      setError("Please enter your API key.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await axios.post("http://localhost:5000/api/ai/plan", {
        data: questions || input,
        apiKey: userKey,
        provider,
      });
      setPlan(res.data.result);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", fontFamily: "sans-serif" }}>
      <h1>Sub Plans Generator</h1>

      <textarea
        placeholder="Enter lesson topic or instructions..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        style={{ width: "100%", marginBottom: "1rem" }}
      />

      <input
        type="text"
        placeholder="Enter your API key (not needed for Ollama)"
        value={userKey}
        onChange={(e) => setUserKey(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      />

      <select
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem" }}
      >
        <option value="openai">OpenAI</option>
        <option value="huggingface">Hugging Face</option>
        <option value="claude">Claude (API)</option>
        <option value="gemini">Gemini</option>
        <option value="ollama">Claude (Ollama local)</option>
      </select>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleGenerateQuestions} disabled={loading} style={{ marginRight: "1rem" }}>
          Generate Questions
        </button>
        <button onClick={handleGeneratePlan} disabled={loading}>
          Generate Plan
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {questions && (
        <div style={{ marginTop: "1rem" }}>
          <h2>Follow-up Questions:</h2>
          <pre>{questions}</pre>
        </div>
      )}

      {plan && (
        <div style={{ marginTop: "1rem" }}>
          <h2>Lesson Plan:</h2>
          <pre>{plan}</pre>
        </div>
      )}
    </div>
  );
}

export default App;