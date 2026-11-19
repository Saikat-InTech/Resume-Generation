import express from "express";
import cookie from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookie());
// here we import route
import { authRoute } from "./router/auth.router.js";

app.use("/api/auth", authRoute);

export default app;
