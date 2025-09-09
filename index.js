import "dotenv/config";
import express from "express";
import MahasiswaRoutesAuth from "./Routes/authMahasiswa.js";
import DosenRoutesAuth from "./Routes/authDosen.js";
import MahasiswaRoutes from "./Routes/mahasiswa.js";
import DosenRoutes from "./Routes/dosen.js";
import MahasiswaBioRoutes from "./Routes/mahasiswaBio.js";
import DosenBioRoutes from "./Routes/dosenBio.js";
import MataKuliahRoutes from "./Routes/mataKuliah.js";
import TugasRoutes from "./Routes/tugas.js";
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MAHASISWA ROUTES AUTH
app.use("/auth", MahasiswaRoutesAuth);

// MAHASISWA ROUTES
app.use(MahasiswaRoutes);

// MAHASISWA BIO ROUTES
app.use(MahasiswaBioRoutes);

// DOSEN ROUTES AUTH
app.use("/auth", DosenRoutesAuth);

// DOSEN ROUTES
app.use(DosenRoutes);

// DOSEN BIO ROUTES
app.use(DosenBioRoutes);

// MATA KULIAH ROUTES
app.use(MataKuliahRoutes);

// TUGAS ROUTES
app.use(TugasRoutes);

app.get("/", (req, res) => {
  res.send("Hello world susupati");
});

app.listen(port, () => {
  console.log("App listening on port : " + port);
});

export default app;
