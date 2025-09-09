import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getMahasiswaByParams(req, res) {
  const mahasiswaId = +req.params.id;
  try {
    const where = {
      id: mahasiswaId,
    };

    const mahasiswa = await prisma.mahasiswa.findUnique({
      where: where,
      include: {
        mahasiswaBio: true,
        tugas: true,
        kelas: true,
      },
    });
    return res.status(200).json(mahasiswa);
  } catch (err) {
    console.log("Error finding mahasiswa", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllMahasiswa(req, res) {
  try {
    const mahasiswas = await prisma.mahasiswa.findMany({
      include: {
        mahasiswaBio: true,
        tugas: true,
        kelas: true,
      },
    });
    return res.status(200).json(mahasiswas);
  } catch (err) {
    console.log("Error finding mahasiswa", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteMahasiswa(req, res) {
  const mahasiswaId = +req.params.id;

  if (isNaN(mahasiswaId)) {
    return res.status(400).json({ error: "Invalid mahasiswa ID" });
  }

  try {
    const where = {
      id: mahasiswaId,
    };

    const exist = await prisma.mahasiswa.findUnique({
      where: where,
    });

    if (!exist) {
      return res.status(404).json({ error: "Mahasiswa not found" });
    }

    const mahasiswa = await prisma.mahasiswa.delete({
      where: where,
    });
    return res.status(200).json(mahasiswa);
  } catch (err) {
    console.log("Error deleting mahasiswa", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateMahasiswa(req, res) {
  const mahasiswaId = +req.params.id;
  const body = req.body;

  if (!body.email.trim() || body.email.trim() === "") {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!body.name.trim() || body.name.trim() == "") {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const where = {
      id: mahasiswaId,
    };

    const dataMahasiswa = {
      name: body.name.trim(),
      email: body.email.trim(),
    };

    const mahasiswa = await prisma.mahasiswa.update({
      where: where,
      data: dataMahasiswa,
    });
    return res.status(200).json(mahasiswa);
  } catch (err) {
    console.log("Error updating mahasiswa", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
