import e from "express";
import { getAllMahasiswaOnTugas } from "../Controller/mahasiswaOnTugas";
import {
  authenticationTokenMiddleware,
  allowRoles,
} from "../Middleware/AuthenticationTokenMahasiswa";

const router = e.Router();

router.get("/mahasiswaOnTugas", getAllMahasiswaOnTugas);

export default router;
