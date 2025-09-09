import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createMahasiswaBio(req, res) {
  const body = req.body;

  if (!body.nim.trim() || body.nim.trim() === "") {
    return res.status(400).json({ error: "Nim is required" });
  }

  if (!body.jurusan.trim() || body.jurusan.trim() == "") {
    return res.status(400).json({ error: "Jurusan is required" });
  }

  if (!body.angkatan.trim() || body.angkatan.trim() == "") {
    return res.status(400).json({ error: "Angakatan is required" });
  }

  try {
    const dataMahasiswaBio = {
      nim: body.nim,
      jurusan: body.jurusan,
      angkatan: body.angkatan,
      mahasiswaId: +req.user.id,
    };

    const existNim = await prisma.mahasiswaBio.findUnique({
      where: {
        nim: body.nim,
      },
    });

    if (existNim) {
      return res.status(409).json({ error: "NIM is already exist" });
    }

    const mahasiswaBio = await prisma.mahasiswaBio.create({
      data: dataMahasiswaBio,
    });

    return res.status(201).json({
      message: "Creating Mahasiswa Bio Successfully",
      data: mahasiswaBio,
    });
  } catch (err) {
    console.log("Error creating mahasiswa bio", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getMahasiswaBioByParams(req, res) {
  const mahasiswaBioId = +req.params.id;
  try {
    const where = {
      id: mahasiswaBioId,
    };

    const mahasiswaBio = await prisma.mahasiswaBio.findUnique({
      where: where,
    });
    return res.status(200).json(mahasiswaBio);
  } catch (err) {
    console.log("Error finding mahasiswaBio", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllMahasiswaBio(req, res) {
  try {
    const mahasiswaBios = await prisma.mahasiswaBio.findMany();
    return res.status(200).json(mahasiswaBios);
  } catch (err) {
    console.log("Error finding mahasiswaBio", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteMahasiswaBio(req, res) {
  const mahasiswaBioId = +req.params.id;

  if (isNaN(mahasiswaBioId)) {
    return res.status(400).json({ error: "Invalid mahasiswaBio ID" });
  }

  try {
    const where = {
      id: mahasiswaBioId,
    };

    const exist = await prisma.mahasiswaBio.findUnique({
      where: where,
    });

    if (exist.mahasiswaId !== req.user.id) {
      return res.status(404).json({ error: "Unknown authorized" });
    }

    if (!exist) {
      return res.status(404).json({ error: "MahasiswaBio not found" });
    }

    const mahasiswaBio = await prisma.mahasiswaBio.delete({
      where: where,
    });
    return res.status(200).json(mahasiswaBio);
  } catch (err) {
    console.log("Error deleting mahasiswaBio", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateMahasiswaBio(req, res) {
  const mahasiswaBioMahasiswaId = +req.params.id;
  const body = req.body;

  if (!body.nim.trim() || body.nim.trim() === "") {
    return res.status(400).json({ error: "NIM is required" });
  }

  if (!body.jurusan.trim() || body.jurusan.trim() == "") {
    return res.status(400).json({ error: "Jurusan is required" });
  }

  if (!body.angkatan.trim() || body.angkatan.trim() == "") {
    return res.status(400).json({ error: "Angkatan is required" });
  }
  console.log("Jolla");

  try {
    const where = {
      id: mahasiswaBioMahasiswaId,
    };

    const dataMahasiswaBio = {
      nim: body.nim,
      jurusan: body.jurusan,
      angkatan: body.angkatan,
      mahasiswaId: +req.user.id,
    };

    const mahasiswaBioId = await prisma.mahasiswaBio.findUnique({
      where: where,
    });

    if (mahasiswaBioId.mahasiswaId !== req.user.id) {
      return res.status(404).json({ error: "Unknown authorized" });
    }

    console.log(
      "mhsId = " + mahasiswaBioId.mahasiswaId + " !== " + req.user.id
    );

    const mahasiswaBio = await prisma.mahasiswaBio.update({
      where: where,
      data: dataMahasiswaBio,
    });

    return res.status(200).json({
      message: "Update mahasiswa bio successfully",
      data: mahasiswaBio,
    });
  } catch (err) {
    console.log("Error updating mahasiswaBio", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
