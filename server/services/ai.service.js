import axios from "axios";

/**
 * Generates AI response using OpenRouter API
 * Response style adapts based on user intent
 */
export const getAIResponse = async (prompt) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content: `
You are a helpful AI assistant.

IMPORTANT RESPONSE RULES:

1. Default behavior:
   - Keep answers SHORT and SIMPLE
   - Use plain text
   - One or two short paragraphs maximum

2. If the question is casual, conversational, or conceptual:
   - DO NOT use headings
   - DO NOT use bullet points
   - DO NOT use code blocks
   - Sound natural and human

3. ONLY use structured formatting (headings, bullets, code blocks) IF:
   - The user explicitly asks for code, OR
   - The question is clearly technical and requires explanation

4. NEVER include code examples unless explicitly required.

5. Avoid tutorials, long explanations, or examples unless asked.

Adapt your response style strictly to the user's intent.
`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.5
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return (
      response.data?.choices?.[0]?.message?.content?.trim() ||
      "No response generated."
    );
  } catch (error) {
    console.error(
      "OpenRouter API Error:",
      error.response?.data || error.message
    );
    return "Sorry, I couldn’t generate a response right now.";
  }
};
