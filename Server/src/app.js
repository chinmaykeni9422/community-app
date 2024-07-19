import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config({
    path: "./.env",
});

const app = express();

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true,
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()) ;
app.use(express.static("public")) ;

// Routes
import newUserRoutes from "./routes/newUser.routes.js";
import existedUserRoutes from "./routes/existedUser.routes.js";

app.use("/api/newuser", newUserRoutes);
app.use("/api/existedUser", existedUserRoutes);

app.get('/api/jokes', (req,res) => (
    res.send([{id:1, joke:"joke1"},{id:2, joke:"joke2"},{id:3, joke:"joke3"}])
))

export default app;
