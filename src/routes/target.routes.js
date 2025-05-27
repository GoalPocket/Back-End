import express from "express";
const router = express.Router();
import targetController from "../controllers/target.controller.js";
import authenticate from "../middlewares/auth.middleware.js";

// Semua route butuh autentikasi
router.use(authenticate);

router.post("/", targetController.createTarget); // POST /targets
router.get("/", targetController.getTargets); // GET /targets
router.get("/:id", targetController.getTarget); // GET /targets/:id
router.put("/:id", targetController.updateTarget); // PUT /targets/:id
router.delete("/:id", targetController.deleteTarget); // DELETE /targets/:id
router.post("/:id/complete", targetController.markTargetAsComplete); // POST /targets/:id/complete

export default router;
