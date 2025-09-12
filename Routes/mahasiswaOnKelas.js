import e from "express";
import { getAllMahasiswaOnKelas } from "../Controller/mahasiswaOnKelas.js";
import {
  authenticationTokenMiddleware,
  allowRoles,
} from "../Middleware/AuthenticationTokenMahasiswa.js";

const router = e.Router();

router.get("/mahasiswaOnKelas", getAllMahasiswaOnKelas);

export default router;
