import e from "express";
import {
  authenticationTokenMiddleware,
  allowRoles,
} from "../Middleware/AuthenticationTokenMahasiswa.js";
import {
  deleteDosen,
  getAllDosen,
  getDosenByParams,
  updateDosen,
} from "../Controller/dosen.js";

const router = e.Router();

router.get(
  "/dosen/:id",
  authenticationTokenMiddleware,
  allowRoles(["dosen", "mahasiswa"], ["dosen", "korti", "mahasiswa"]),
  getDosenByParams
);
router.get(
  "/dosen",
  authenticationTokenMiddleware,
  allowRoles(["dosen"]),
  getAllDosen
);
router.delete(
  "/dosen/:id",
  authenticationTokenMiddleware,
  allowRoles(["dosen"]),
  deleteDosen
);
router.put(
  "/dosen/:id",
  authenticationTokenMiddleware,
  allowRoles(["dosen"]),
  updateDosen
);

export default router;
