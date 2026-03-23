export const questionPrompt = (input) => `
You are an assistant helping a teacher create substitute lesson plans.

Ask 5-8 helpful follow-up questions to clarify the lesson.

User Input:
${input}
`;

export const planPrompt = (data) => `
Create a detailed substitute teacher lesson plan.

DATA:
${data}
`;