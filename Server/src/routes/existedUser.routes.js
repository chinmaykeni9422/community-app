import {Router} from "express" ;
import { checkUserLogin, addUserNumber, getNumbers } from "../controllers/login.controller.js";

const router = Router() ;

router.post("/login", checkUserLogin) ;
router.post("/addNumber", addUserNumber) ;
router.get("/Numbers/:user_id", getNumbers) ;

export default router;