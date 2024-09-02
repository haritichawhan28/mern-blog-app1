import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors({
  origin: 'https://66d605005cc752353b4a27ab--benevolent-gumdrop-fd61ee.netlify.app',
  // You can also allow credentials if necessary
  credentials: true
}));
app.use(bodyParser.json());

const PORT = 8000;
const MONGO_URI =
  "mongodb+srv://haritichawhan:root@cluster0.qhre0.mongodb.net/blogs?retryWrites=true&w=majority&appName=Cluster0";

// CONNECT TO MONGODB
const connect = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Mongodb connection error: ", error);
  }
};

// AUTH ROUTES
import authRouter from "./router/userRouter.js";
import blogRouter from "./router/blogRouter.js";

app.use("/authentication", authRouter);
app.use("/blog", blogRouter);

// CONNECT TO BACKEND
app.listen(PORT, () => {
  connect();
  console.log(`Server running on port ${PORT}`);
});
