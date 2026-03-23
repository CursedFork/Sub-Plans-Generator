# Sub Plans Generator

A web application that helps teachers quickly generate sub plans for any class.  
Supports both offline LLM models (local GPT4All) and cloud LLMs via ChatGPT or Gemini API keys.

## Features

- Generate sub plans from prompts like "Math class, grade 5"  
- Supports ChatGPT or Gemini API keys for cloud LLM usage  
- Optional offline generation with GPT4All (no internet required)  
- Template-based sub plan generation  
- React frontend + Node.js backend  

## Prerequisites

- Node.js >= 18  
- npm or yarn  
- Internet connection for cloud LLMs (optional for GPT4All offline)  

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/sub-plans-generator.git
cd sub-plans-generator
```
### 2. Install dependencies
Backend
```bash
cd server
npm install
```
Frontend
```bash
cd ../client
npm install
```

## Using ChatGPT or Gemini

To use cloud LLMs, teachers must provide their own API key. No key is stored in the repository.

### 1. Create a `.env` file in `server/`

```env
OPENAI_API_KEY=sk-your-chatgpt-api-key
GEMINI_API_KEY=your-gemini-api-key
```
The backend reads these environment variables to make requests to the LLMs.

### 2. Get a ChatGPT API key

- Sign up at [OpenAI](https://platform.openai.com/)  
- Go to **API Keys**  
- Copy your key and paste it into `.env` under `OPENAI_API_KEY`

### 3. Get a Gemini API key

- Sign up at [Google Cloud AI](https://developers.generativeai.google/)  
- Create a project and generate an API key  
- Paste it into `.env` under `GEMINI_API_KEY`

## Running the Application

### Backend

```bash
cd server
node index.js
```
- Server will start at `http://localhost:5000`  
- Supports both offline GPT4All and cloud LLMs

### Frontend

```bash
cd ../client
npm run dev
```
- Frontend will start at `http://localhost:5173`  
- Open your browser to interact with the Sub Plans Generator

## Using GPT4All Offline (Optional)

1. Download the GPT4All Lora Quantized model `.bin` file from: [https://gpt4all.io/models/gpt4all-lora](https://gpt4all.io/models/gpt4all-lora)  
2. Place it in the `server/models/` folder:

```text
server/models/gpt4all-lora-quantized.bin
```
3. Test the local model:
```bash
cd server
node testGPT4All.js
```
- The script will load the model and generate a test sub plan

## Notes

- Do not commit `.env` — it contains private API keys  
- Node modules are ignored in `.gitignore`  
- Teachers can switch between offline and cloud LLMs seamlessly  
- Large models (GPT4All) may take a few seconds to load  
- Ensure your model `.bin` file is in `server/models/` if using offline GPT4All
- This application works much better with paid API keys which can be obtained through a variety of models. If you are up to it try to run a local model.

## Contributing

1. Fork the repository  
2. Create a feature branch  
3. Submit a pull request

## License

MIT License
