import { getTinaResponse } from "../services/claudeServices.js";

export const handleChatResponse = async (req, res) => {
  try {
    const { messageHistory } = req.body;

    //Validation guard: Check if message exists
    if (!messageHistory || !Array.isArray(messageHistory)) {
      return res.status(400).json({
        error: "Invalid body format. 'message' field is required",
      });
    }

    //Let service file do the work
    const tinaReply = await getTinaResponse(messageHistory);

    res.status(200).json({ reply: tinaReply });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "Failed to fetch response from Tina" });
  }
};
