import e from "express";
import {
  getAllDosenBio,
  createDosenBio,
  deleteDosenBio,
  updateDosenBio,
  getDosenBioByParams,
} from "../Controller/dosenBio.js";
import {
  authenticationTokenMiddleware,
  allowRoles,
} from "../Middleware/AuthenticationTokenMahasiswa.js";

const router = e.Router();

router.get(
  "/dosenBio",
  authenticationTokenMiddleware,
  allowRoles(["dosen"], ["dosen"]),
  getAllDosenBio
);

router.get(
  "/dosenBio/:id",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa", "dosen"], ["mahasiswa", "korti", "dosen"]),
  getDosenBioByParams
);

router.post(
  "/dosenBio",
  authenticationTokenMiddleware,
  allowRoles(["dosen"], ["dosen"]),
  createDosenBio
);

router.put(
  "/dosenBio/:id",
  authenticationTokenMiddleware,
  allowRoles(["dosen"], ["dosen"]),
  updateDosenBio
);

router.delete(
  "/dosenBio/:id",
  authenticationTokenMiddleware,
  allowRoles(["dosen"], ["dosen"]),
  deleteDosenBio
);

export default router;
