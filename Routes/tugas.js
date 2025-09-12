import e from "express";
import {
  getTugasByParams,
  updateTugas,
  createTugas,
  deleteTugas,
  getAllTugas,
} from "../Controller/tugas.js";

import {
  authenticationTokenMiddleware,
  allowRoles,
} from "../Middleware/AuthenticationTokenMahasiswa.js";

const router = e.Router();

router.get(
  "/tugas",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa", "dosen"], ["mahasiswa", "korti", "dosen"]),
  getAllTugas
);

router.get(
  "/tugas/:id",
  authenticationTokenMiddleware,
  allowRoles(["mahasiswa", "dosen"], ["mahasiswa", "korti", "dosen"]),
  getTugasByParams
);

router.post(
  "/tugas",
  authenticationTokenMiddleware,
  allowRoles(["dosen"], ["dosen"]),
  createTugas
);

router.put(
  "/tugas/:id",
  authenticationTokenMiddleware,
  allowRoles(["dosen"], ["dosen"]),
  updateTugas
);

router.delete(
  "/tugas/:id",
  authenticationTokenMiddleware,
  allowRoles(["dosen"], ["dosen"]),
  deleteTugas
);

export default router;
