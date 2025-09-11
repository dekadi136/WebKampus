import "dotenv/config";
import e from "express";
import {
  getMahasiswaByParams,
  getAllMahasiswa,
  deleteMahasiswa,
  updateMahasiswa,
  promotMahasiswaKorti,
  unpromotMahasiswaKorti,
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
router.patch(
  "/mahasiswa/:id/promotKorti",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa", "dosen"], ["korti"]),
  promotMahasiswaKorti
);
router.patch(
  "/mahasiswa/:id/unpromotKorti",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa", "dosen"]),
  unpromotMahasiswaKorti
);

export default router;
