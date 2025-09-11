import e from "express";
import { createKelas, getAllKelas } from "../Controller/kelas.js";

const router = e.Router();

router.post("/kelas", createKelas);
router.get("/kelas", getAllKelas);

export default router;
