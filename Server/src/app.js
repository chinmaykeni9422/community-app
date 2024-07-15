import express from "express" ;
import bodyParser from "body-parser" ;
import  dotenv from "dotenv" ;
import cors from "cors" ;

dotenv.config({
    path: "./.env",
});


const app = express() ;

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(bodyParser.json()) ;

//ROutes
import newUserRoutes from "./routes/newUser.routes.js"

app.use('/api/newUser', newUserRoutes) ;

export default app ;