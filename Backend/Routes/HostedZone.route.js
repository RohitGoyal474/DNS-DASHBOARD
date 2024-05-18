import { Router } from "express";
import { CreateHostedZone, DeleteHostedZone, HostedZoneList } from "../Controller/HostedZone.controller.js";
import { verifyJWT } from "../Middleware/auth.Middleware.js";
 
const router = Router();

router.route("/HostedZoneList").get(HostedZoneList);
router.route("/ceateHostedZone").post(CreateHostedZone);
router.route("/DeleteHostedZone").post(DeleteHostedZone);
export default router