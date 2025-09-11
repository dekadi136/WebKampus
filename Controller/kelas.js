import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createKelas(req, res) {
  const body = req.body;

  if (!body.ruangan || body.ruangan === "") {
    return res.status(400).json({ error: "Nama ruangan is required" });
  }

  if (!body.hari || body.hari === "") {
    return res.status(400).json({ error: "Hari kelas is required" });
  }

  if (!body.jam || body.jam === "") {
    return res.status(400).json({ error: "Jam kelas is required" });
  }

  if (!body.dosenId || body.dosenId === "") {
    return res.status(400).json({ error: "Nama dosen is required" });
  }

  if (!body.mataKuliahId || body.mataKuliahId === "") {
    return res.status(400).json({ error: "Matkul is required" });
  }

  try {
    const kelas = await prisma.kelas.create({
      data: {
        ruangan: body.ruangan,
        hari: body.hari,
        jam: body.jam,
        dosen: {
          connect: { id: +body.dosenId },
        },
        mataKuliah: {
          connect: { id: +body.mataKuliahId },
        },
      },
    });

    const dataMahasiswa = await prisma.mahasiswa.findMany({
      where: {
        status: "aktif",
      },
    });

    let dataKelasMahasiswa = [];
    for (let i = 0; i < dataMahasiswa.length; i++) {
      dataKelasMahasiswa.push({
        mahasiswaId: dataMahasiswa[i].id,
        kelasId: kelas.id,
      });
    }

    const createKelasMahasiswa = await prisma.mahasiswaOnKelas.createMany({
      data: dataKelasMahasiswa,
    });

    return res.status(201).json({
      message: "Create kelas successfully",
      dataKelas: kelas,
      dataKelasMahasiswa: createKelasMahasiswa,
    });
  } catch (err) {
    console.log("Error creating kelas", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getKelasById(req, res) {
  const kelasId = +req.params.id;
  try {
    const kelas = await prisma.kelas.findUnique({
      where: {
        id: kelasId,
      },
      include: {
        mahasiswa: true,
      },
    });
    return res.status(200).json({
      message: "Success getting kelas",
      data: kelas,
    });
  } catch (err) {
    console.log("Error getting kelas", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllKelas(req, res) {
  try {
    const kelas = await prisma.kelas.findMany({
      include: {
        mahasiswa: true,
      },
    });
    return res
      .status(200)
      .json({ message: "Success getting all kelas", data: kelas });
  } catch (err) {
    console.log("Error getting all kelas", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteKelas(req, res) {
  const kelasId = +req.params.id;

  if (isNaN(kelasId)) {
    return res.status(400).json({ error: "Invalid kelas ID" });
  }

  try {
    const kelas = await prisma.kelas.delete({
      where: {
        id: kelasId,
      },
    });

    return res.status(200).json({
      message: "Delete kelas successfully",
      data: kelas,
    });
  } catch (err) {
    console.log("Error deleting kelas", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateKelas(req, res) {
  const kelasId = +req.params.id;
  const body = req.body;

  if (!body.ruangan || body.ruangan === "") {
    return res.status(400).json({ error: "Nama ruangan is required" });
  }

  if (!body.hari || body.hari === "") {
    return res.status(400).json({ error: "Hari kelas is required" });
  }

  if (!body.jam || body.jam === "") {
    return res.status(400).json({ error: "Jam kelas is required" });
  }

  if (!body.dosenId || body.dosenId === "") {
    return res.status(400).json({ error: "Nama dosen is required" });
  }

  if (!body.mataKuliahId || body.mataKuliahId === "") {
    return res.status(400).json({ error: "Matkul is required" });
  }

  try {
    const kelas = await prisma.kelas.update({
      where: {
        id: kelasId,
      },
      data: {
        ruangan: body.ruangan,
        hari: body.hari,
        jam: body.jam,
        dosen: {
          connect: { id: +body.dosenId },
        },
        mataKuliah: {
          connect: { id: +body.mataKuliahId },
        },
      },
    });
    return res.status(400).json({
      message: "Update kelas successfully",
      data: kelas,
    });
  } catch (err) {
    console.log("Error updating kelas", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
