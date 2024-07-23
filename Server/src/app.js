import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import {Protect} from "./middlewares/auth.middleware.js"

dotenv.config({
    path: "./.env",
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()) ;
app.use(express.static("public")) ;

// Routes
import newUserRoutes from "./routes/newUser.routes.js";
import existedUserRoutes from "./routes/existedUser.routes.js";

app.use("/api/newuser", newUserRoutes);
app.use("/api/existedUser", existedUserRoutes);

app.get('/api/protected', Protect,(req,res) => (
    res.send("hello from protected route") 
))

export default app;
