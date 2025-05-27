import express from "express";
const router = express.Router();
import trackingController from "../controllers/tracking.controller.js";
import authenticate from "../middlewares/auth.middleware.js";

router.use(authenticate);

router.post("/", trackingController.createTracking); // POST /trackings
router.get("/", trackingController.getTrackings); // GET /trackings (filter by query)
router.get("/history", trackingController.getTrackingHistory); // GET /trackings/history
router.delete("/:id", trackingController.deleteTracking); // DELETE /trackings/:id

export default router;
