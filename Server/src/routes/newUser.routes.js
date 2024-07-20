import {Router} from "express" ;
import { checkRefNum, checkUserMobNum, verifyOTP, createUserProfileController, fetchEnumValues } from "../controllers/newUser.controlller.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router() ;

router.route("/checkref").post(checkRefNum) ;
router.route("/checkMobNum").post(checkUserMobNum) ;
router.route("/verifyotp").post(verifyOTP) ;
router.route('/create-profile').post(upload.single('photo'), createUserProfileController);
router.get('/enums/:columnName', fetchEnumValues);

export default router;