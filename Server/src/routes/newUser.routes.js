import {Router} from "express" ;
import { checkRefNum, checkUserMobNum, verifyOTP } from "../controllers/newUser.controlller.js";

const router = Router() ;

router.route("/checkref").post(checkRefNum) ;
router.route("/checkMobNum").post(checkUserMobNum) ;
router.route("/verifyotp").post(verifyOTP) ;

export default router;