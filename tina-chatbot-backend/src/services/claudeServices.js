import { Anthropic } from "@anthropic-ai/sdk";
import { config } from "../config/env.js";
import { systemInstructions } from "../prompts/tinaPrompt.js";

const anthropic = new Anthropic({
  apiKey: config.anthropicApiKey,
});

export const getTinaResponse = async (messageHistory) => {
  const response = await anthropic.messages.create({
    model: config.claudeModel,
    max_tokens: 900,
    system: systemInstructions,
    messages: messageHistory,
  });

  let rawText = "";
  for (const block of response.content) {
    if (block.type === "text") {
      rawText += block.text;
    }
  }

  try {
    return rawText.trim();
  } catch (error) {
    console.error("Error communicating with Claude API:", error);
    throw new Error("Failed to fetch response from Claude API");
  }
};
