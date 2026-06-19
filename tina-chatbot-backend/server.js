import express from "express";
import cors from "cors";
import { config } from "./src/config/env.js";
import chatRoutes from "./src/routes/chatRoutes.js";

const app = express();
const PORT = config.port || 5000;

app.use(
  cors({
    origin: config.frontendOrigin,
  }),
);

app.use(express.json());

app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`🎯Chatbot backend on target port${PORT}`);
});
