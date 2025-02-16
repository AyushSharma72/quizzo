import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";
import { testDBConnection } from "./db";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(router); // Mount the router

const startServer = async () => {
  try {
    await testDBConnection();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
