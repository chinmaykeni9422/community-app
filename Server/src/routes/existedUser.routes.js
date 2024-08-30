import {Router} from "express" ;
import { checkUserLogin, addUserNumber, getNumbers, UpdateProfile, getConfig } from "../controllers/login.controller.js";

const router = Router() ;

router.post("/login", checkUserLogin) ;
router.post("/addNumber", addUserNumber) ;
router.get("/Numbers/:user_id", getNumbers) ;
router.post("/profileUpdate", UpdateProfile) ;
router.get('/config', getConfig);

export default router;