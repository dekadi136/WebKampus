import e from "express";
import {
  createKelas,
  getAllKelas,
  deleteKelas,
  getKelasById,
  updateKelas,
} from "../Controller/kelas.js";

const router = e.Router();

router.post("/kelas", createKelas);
router.get("/kelas", getAllKelas);
router.get("/kelas/:id", getKelasById);
router.delete("/kelas/:id", deleteKelas);
router.put("/kelas/id", updateKelas);

export default router;
