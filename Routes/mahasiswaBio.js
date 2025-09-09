import e from "express";
import {
  getAllMahasiswaBio,
  getMahasiswaBioByParams,
  createMahasiswaBio,
  updateMahasiswaBio,
  deleteMahasiswaBio,
} from "../Controller/mahasiswaBio.js";
import {
  authenticationTokenMiddleware,
  allowRoles,
} from "../Middleware/AuthenticationTokenMahasiswa.js";

const router = e.Router();

router.get(
  "/mahasiswaBio",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa", "dosen"], ["mahasiswa", "korti", "dosen"]),
  getAllMahasiswaBio
);

router.get(
  "/mahasiswaBio/:id",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa", "dosen"], ["mahasiswa", "korti", "dosen"]),
  getMahasiswaBioByParams
);

router.post(
  "/mahasiswaBio",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa"], ["mahasiswa", "korti"]),
  createMahasiswaBio
);

router.put(
  "/mahasiswaBio/:id",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa"], ["mahasiswa", "korti"]),
  updateMahasiswaBio
);

router.delete(
  "/mahasiswaBio/:id",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa"], ["mahasiswa", "korti"]),
  deleteMahasiswaBio
);

export default router;
