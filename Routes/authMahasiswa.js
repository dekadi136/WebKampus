import e from "express";
import {
  RegisterMahasiswa,
  LoginMahasiswa,
} from "../Controller/authMahasiswa.js";

const router = e.Router();

// MAHASISWA ROUTES
router.post("/mahasiswaRegister", RegisterMahasiswa);
router.post("/mahasiswaLogin", LoginMahasiswa);

export default router;
