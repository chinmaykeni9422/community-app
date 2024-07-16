import {Router} from "express" ;
import { checkRefNum, checkUserMobNum, verifyOTP } from "../controllers/newUser.controlller.js";

const router = Router() ;

router.post("/checkRef", checkRefNum) ;
router.post("/checkMobNum", checkUserMobNum) ;
router.post("/verifyotp", verifyOTP) ;

export default router;