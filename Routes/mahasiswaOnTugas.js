import e from "express";
import { getAllMahasiswaOnTugas } from "../Controller/mahasiswaOnTugas.js";
import {
  authenticationTokenMiddleware,
  allowRoles,
} from "../Middleware/AuthenticationTokenMahasiswa.js";

const router = e.Router();

router.get("/mahasiswaOnTugas", getAllMahasiswaOnTugas);

export default router;
