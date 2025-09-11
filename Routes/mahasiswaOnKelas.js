import e from "express";
import { getAllMahasiswaOnKelas } from "../Controller/mahasiswaOnKelas";
import {
  authenticationTokenMiddleware,
  allowRoles,
} from "../Middleware/AuthenticationTokenMahasiswa";

const router = e.Router();

router.get("/mahasiswaOnKelas", getAllMahasiswaOnKelas);

export default router;
