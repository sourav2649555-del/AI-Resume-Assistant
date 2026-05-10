import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const ai = new OpenAI({
apiKey: process.env.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
});

app.post("/analyze", async (req,res)=>{

let text=req.body.text;

let response = await ai.chat.completions.create({
model:"gpt-4o-mini",
messages:[
{role:"system",content:"You are a resume expert. Give ATS score, strengths, weaknesses, improvements and interview questions."},
{role:"user",content:text}
]
});

res.json({
result:response.choices[0].message.content
});

});

app.listen(3000,()=>console.log("Server running"));
