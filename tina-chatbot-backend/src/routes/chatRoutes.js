import express from "express";
import { handleChatResponse } from "../controllers/chatController.js";

const router = express.Router();

router.post("/chat", handleChatResponse);

export default router;
