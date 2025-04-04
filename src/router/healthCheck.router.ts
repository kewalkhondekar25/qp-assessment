import { Router } from "express";
import { healthCheck } from "../controller/healthCheck.controller";

const router = Router();

router.route("/healthcheck").get(healthCheck);

export default router;