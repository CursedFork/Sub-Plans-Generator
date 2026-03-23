// testGpt4All.js
import pkg from "gpt4all";      // default import for CommonJS
const GPT4All = pkg.default;    // grab the default export

import path from "path";

const modelPath = path.join(process.cwd(), "models", "gpt4all-lora-quantized.bin");

// v3.x API: call GPT4All as a function, NOT with `new`
const gpt4all = GPT4All(modelPath);

async function runTest() {
  await gpt4all.load();

  const output = await gpt4all.generate(
    "Write a 3-step sub plan for 5th grade math class:",
    { max_tokens: 500 }
  );

  console.log(output);
}

runTest();