import axios from "axios";

/**
 * Generates AI response using OpenRouter API
 * Responses are structured using markdown for clean UI rendering
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
You are an AI tutor.

Always format responses using clean, readable markdown.

Formatting rules:
- Use headings (##, ###) for sections
- Use bullet points for lists
- Keep paragraphs short and clear
- Use fenced code blocks with language tags (e.g. \`\`\`js)
- Avoid LaTeX or mathematical notation
- Do NOT write everything in one paragraph
- Be concise and beginner-friendly
`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.6
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return (
      response.data?.choices?.[0]?.message?.content ||
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
