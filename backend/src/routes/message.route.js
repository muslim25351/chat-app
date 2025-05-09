import express from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get('/users', isAuthenticated, getUsersForSidebar)
export default router;

