import {Router} from "express" ;
import { checkUserLogin } from "../controllers/login.controller.js";

const router = Router() ;

router.post("/login", checkUserLogin) ;

export default router;