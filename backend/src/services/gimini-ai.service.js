const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function createResponse(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: `
        Respond clearly and concisely. Keep answers brief, relevant, and to the point.
        Use simple language and avoid jargon. Provide accurate and factual information
        `,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating response:", error);
    throw new Error("Failed to generate response");
  }
}

module.exports = createResponse;
