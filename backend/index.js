import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import helloRoutes from "./routes/hello.js";
config();

// Import Routers

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/hello", helloRoutes);

const port = process.env.PORT || "3000"

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});