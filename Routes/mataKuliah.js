import e from "express";
import {
  getAllMataKuliah,
  getMataKuliahByParams,
  createMataKuliah,
  deleteMataKuliah,
  updateMataKuliah,
} from "../Controller/mataKuliah.js";
import {
  authenticationTokenMiddleware,
  allowRoles,
} from "../Middleware/AuthenticationTokenMahasiswa.js";

const router = e.Router();

router.get(
  "/mataKuliah",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa", "dosen"], ["mahasiswa", "korti", "dosen"]),
  getAllMataKuliah
);

router.get(
  "/mataKuliah/:id",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa", "dosen"], ["mahasiswa", "korti", "dosen"]),
  getMataKuliahByParams
);

router.post(
  "/mataKuliah",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa", "dosen"], ["mahasiswa", "korti", "dosen"]),
  createMataKuliah
);

router.put(
  "/mataKuliah/:id",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa", "dosen"], ["mahasiswa", "korti", "dosen"]),
  updateMataKuliah
);

router.delete(
  "/mataKuliah/:id",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa", "dosen"], ["mahasiswa", "korti", "dosen"]),
  deleteMataKuliah
);

export default router;
