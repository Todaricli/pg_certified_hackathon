import express, { json } from "express";
import cors from "cors";
import { config } from "dotenv";
import session from 'express-session';
import passport from 'passport';
import helloRoutes from "./routes/hello.js";
import auth from "./routes/auth/login.js";
import userRoute from "./routes/user/userRoute.js";
import petRoute from "./routes/pet/petRoute.js"
config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/hello", helloRoutes);
app.use("/auth", auth)
app.use('/user', userRoute)
app.use('/pets', petRoute)

const port = process.env.PORT || "3000"

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});