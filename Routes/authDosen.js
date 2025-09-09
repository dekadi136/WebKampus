import e from "express";
import { RegisterDosen, LoginDosen } from "../Controller/authDosen.js";

const router = e.Router();

// DOSEN ROUTES
router.post("/dosenRegister", RegisterDosen);
router.post("/dosenLogin", LoginDosen);

export default router;
