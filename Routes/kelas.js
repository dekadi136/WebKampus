import e from "express";
import {
  createKelas,
  getAllKelas,
  deleteKelas,
  getKelasById,
  updateKelas,
} from "../Controller/kelas.js";
import {
  authenticationTokenMiddleware,
  allowRoles,
} from "../Middleware/AuthenticationTokenMahasiswa.js";

const router = e.Router();

router.post(
  "/kelas",
  authenticationTokenMiddleware,
  allowRoles([["dosen"], ["dosen"]]),
  createKelas
);
router.get(
  "/kelas",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa", "dosen"], ["mahasiswa", "korti", "dosen"]),
  getAllKelas
);
router.get(
  "/kelas/:id",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa", "dosen"], ["mahasiswa", "korti", "dosen"]),
  getKelasById
);
router.delete(
  "/kelas/:id",
  authenticationTokenMiddleware,
  allowRoles(["dosen"], ["dosen"]),
  deleteKelas
);
router.put(
  "/kelas/id",
  authenticationTokenMiddleware,
  allowRoles(["dosen"], ["dosen"]),
  updateKelas
);

export default router;
