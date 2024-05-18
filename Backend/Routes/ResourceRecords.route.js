import { Router } from "express";
import { CreateResourceRecord, ListResourceRecords, UpdateResourceRecord, deleteResourceRecord } from "../Controller/ResourceRecords.js";
import { verifyJWT } from "../Middleware/auth.Middleware.js";

const router = Router();

router.route("/RecourceRecordsList").get(verifyJWT,ListResourceRecords);
router.route("/CreateRecourceRecords").post(CreateResourceRecord);

router.route("/DeleteRecourceRecords").post(deleteResourceRecord);
router.route("/UpdateRecourceRecords").post(UpdateResourceRecord);
export default router