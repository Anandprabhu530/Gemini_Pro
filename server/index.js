import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const chatModel = new ChatGoogleGenerativeAI({
  modelName: "gemini-pro",
  maxOutputTokens: 2048,
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a resume writer"],
  ["user", "{input}"],
]);

const chain = prompt.pipe(chatModel);

app.post("/create", async (req, res) => {
  console.log(req.body);
  const input_data = req.body.prompt_data;
  const data = await chain.invoke({
    input: input_data,
  });
  res.send(data);
});

app.listen(8080, (req, res) => {
  console.log("Listening on port 8080");
});
