import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller.js";
import authenticate from "../middlewares/auth.middleware.js";

router.use(authenticate);

router.get("/profile", userController.getProfile);
router.put("/profile", userController.updateProfile);
router.put("/change-password", userController.changePassword);
router.get("/summary", userController.getSummary);

export default router;
