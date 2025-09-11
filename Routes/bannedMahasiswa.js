import e from "express";
import {
  createMahasiswaBanned,
  getAllMahasiswaBanned,
  deleteMahasiswaBanned,
} from "../Controller/bannedMahasiswa.js";
import {
  authenticationTokenMiddleware,
  allowRoles,
} from "../Middleware/AuthenticationTokenMahasiswa.js";

const router = e.Router();

router.post(
  "/bannedMahasiswa",
  authenticationTokenMiddleware,
  allowRoles(["dosen", "mahasiswa"], ["dosen", "korti"]),
  createMahasiswaBanned
);
router.get(
  "/bannedMahasiswa",
  authenticationTokenMiddleware,
  allowRoles(["dosen", "mahasiswa"], ["dosen", "korti"]),
  getAllMahasiswaBanned
);
router.delete(
  "/bannedMahasiswa",
  authenticationTokenMiddleware,
  allowRoles(["dosen", "mahasiswa"], ["dosen", "korti"]),
  deleteMahasiswaBanned
);

export default router;
