import "dotenv/config";
import e from "express";
import {
  getMahasiswaByParams,
  getAllMahasiswa,
  deleteMahasiswa,
  updateMahasiswa,
} from "../Controller/mahasiswa.js";
import {
  authenticationTokenMiddleware,
  allowRoles,
} from "../Middleware/AuthenticationTokenMahasiswa.js";

const router = e.Router();

router.get(
  "/mahasiswa/:id",
  authenticationTokenMiddleware,
  allowRoles(["dosen", "mahasiswa"], ["korti", "mahasiswa", "dosen"]),
  getMahasiswaByParams
);
router.get(
  "/mahasiswa",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa", "dosen"], ["korti", "mahasiswa", "dosen"]),
  getAllMahasiswa
);
router.delete(
  "/mahasiswa/:id",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa", "dosen"], ["korti"]),
  deleteMahasiswa
);
router.put(
  "/mahasiswa/:id",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa", "dosen"], ["korti"]),
  updateMahasiswa
);

export default router;
