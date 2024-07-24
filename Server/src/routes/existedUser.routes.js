import {Router} from "express" ;
import { checkUserLogin, addUserNumber } from "../controllers/login.controller.js";

const router = Router() ;

router.post("/login", checkUserLogin) ;
router.post("/addNumber", addUserNumber) ;

export default router;