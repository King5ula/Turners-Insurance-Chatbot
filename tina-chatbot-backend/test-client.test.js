import request from "supertest";
import express, { response } from "express";
import chatRoutes from "./src/routes/chatRoutes";
import { config } from "./src/config/env";
import { systemInstructions } from "./src/prompts/tinaPrompt";

//setup simple,temp Express app for this test
const app = express();
app.use(express.json());
app.use("/api", chatRoutes);

describe("Tina Chatbot Live API test", () => {
  //Test 1: Validation guard test
  it("should return a 400 error if we send an invalid body format", async () => {
    const res = await request(app).post("/api/chat").send({});

    expect(res.statusCode).toBe(400);
  });

  //Test 2: Connection test
  it("should successfully talk to the real Claude API and get a response from Tina", async () => {
    //Arrange: Create valid message history array exactly how code is expected
    const sampleHistory = [
      { role: "user", content: "Hello! Show me your Mahindra." },
    ];

    //Act: Send the real array directly to live route path
    const res = await request(app)
      .post("/api/chat")
      .send({ messageHistory: sampleHistory });

    //Assert: Verify connection
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("reply");
    expect(typeof res.body.reply).toBe("string");

    console.log("*****LIVE RESPONSE FROM TINA******");
    console.log(res.body.reply);
  });
});

//Test 3: env.js properties parsing and fallback handling
describe("Core Unit Validations", () => {
  it("should successfully load server config from env.js", () => {
    expect(config).toHaveProperty("claudeModel");
    expect(config).toHaveProperty("port");
    expect(typeof config.port).toBe("number");
  });

  describe("should strictly include the mandatory Task 3 business rules inside our prompt file", () => {
    expect(systemInstructions).toContain("Tina");
    expect(systemInstructions).toContain("Mechanical Breakdown Insurance");
    expect(systemInstructions).toContain("Comprehensive Car Insurance");
    expect(systemInstructions).toContain("10 years old");
    expect(systemInstructions).toContain("trucks");
    expect(systemInstructions).toContain("racing cars");
  });
});
