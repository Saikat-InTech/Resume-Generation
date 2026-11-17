import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_request, response) => {
  response.json({ message: "Welcome to the MERN + AI API" });
});

app.get("/api/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});

export default app;