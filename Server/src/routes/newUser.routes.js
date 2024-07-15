import {Router} from "express" ;
import { checkRefNum, checkUserMobNum } from "../controllers/newUser.controlller.js";

const router = Router() ;

router.get("/checkRef", checkRefNum) ;
// router.post("/login" , logInUser) ;

export default router;