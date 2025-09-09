import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createTugas(req, res) {
  const body = req.body;

  if (!body.name.trim() || body.name.trim() === "") {
    return res.status(400).json({ error: "tugas name is required" });
  }

  if (!body.jadwal.trim() || body.jadwal.trim() == "") {
    return res.status(400).json({ error: "tugas jadwal is required" });
  }

  if (!body.status.trim() || body.status.trim() == "") {
    return res.status(400).json({ error: "tugas status is required" });
  }

  try {
    const dataTugas = {
      name: body.name,
      jadwal: body.jadwal,
      status: body.status,
      dosenId: +req.user.id,
    };

    const tugas = await prisma.tugas.create({
      data: dataTugas,
    });

    const mahasiswas = await prisma.mahasiswa.findMany();

    let mahasiswaOnTugas = [];
    for (let i = 0; i < mahasiswas.length; i++) {
      mahasiswaOnTugas.push({
        mahasiswaId: +mahasiswas[i].id,
        tugasId: +tugas.id,
        namaMahasiswa: mahasiswas[i].name,
        namaTugas: tugas.name,
      });
    }

    const createTugasMahasiswa = await prisma.mahasiswaOnTugas.createMany({
      data: mahasiswaOnTugas,
    });

    return res.status(201).json({
      message: "Creating tugas successfully",
      data: tugas,
    });
  } catch (err) {
    console.log("Error creating tugas", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getTugasByParams(req, res) {
  const tugasId = +req.params.id;
  try {
    const where = {
      id: tugasId,
    };

    const tugas = await prisma.tugas.findUnique({
      where: where,
      include: {
        mahasiswa: true,
      },
    });
    return res.status(200).json(tugas);
  } catch (err) {
    console.log("Error finding mata kuliah", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllTugas(req, res) {
  try {
    const tugas = await prisma.tugas.findMany({
      include: {
        mahasiswa: true,
      },
    });
    return res.status(200).json(tugas);
  } catch (err) {
    console.log("Error finding mata kuliah", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteTugas(req, res) {
  const tugasId = +req.params.id;

  if (isNaN(tugasId)) {
    return res.status(400).json({ error: "Invalid tugas ID" });
  }

  try {
    const where = {
      id: tugasId,
    };

    const tugas = await prisma.tugas.delete({
      where: where,
    });

    return res.status(200).json(tugas);
  } catch (err) {
    console.log("Error deleting tugas", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateTugas(req, res) {
  const tugasParamsId = +req.params.id;
  const body = req.body;

  if (!body.name.trim() || body.name.trim() === "") {
    return res.status(400).json({ error: "tugas name is required" });
  }

  if (!body.jadwal.trim() || body.jadwal.trim() == "") {
    return res.status(400).json({ error: "tugas jadwal is required" });
  }

  if (!body.status.trim() || body.status.trim() == "") {
    return res.status(400).json({ error: "tugas status is required" });
  }

  try {
    const where = {
      id: tugasParamsId,
    };

    const dataTugas = {
      name: body.name,
      jadwal: body.jadwal,
      status: body.status,
      dosenId: +req.user.id,
    };

    const existTugas = await prisma.tugas.findUnique({
      where: {
        id: tugasParamsId,
      },
    });

    if (!existTugas) {
      return res.status(404).json({ error: "Mata kuliah not found" });
    }

    const tugas = await prisma.tugas.update({
      where: where,
      data: dataTugas,
    });

    const mahasiswas = await prisma.mahasiswa.findMany();

    let dataMahasiswaOnTugas = [];
    for (let i = 0; i < mahasiswas.length; i++) {
      dataMahasiswaOnTugas.push({
        mahasiswaId: +mahasiswas[i].id,
        tugasId: +tugas.id,
        namaMahasiswa: mahasiswas[i].name,
        namaTugas: tugas.name,
      });
    }

    const mahasiswaOnTugasDatas = await prisma.mahasiswaOnTugas.findMany();

    let dataTugasMahasiswa = [];
    let tugasMahasiswaUpdate = {};
    for (let i = 0; i < dataMahasiswaOnTugas.length; i++) {
      tugasMahasiswaUpdate = await prisma.mahasiswaOnTugas.update({
        where: {
          id: mahasiswaOnTugasDatas[i].id,
        },
        data: dataMahasiswaOnTugas[i],
      });
      dataTugasMahasiswa.push(tugasMahasiswaUpdate);
    }

    return res.status(200).json({
      message: "Update mata kuliah successfully",
      dataTugas: tugas,
      dataMahasiswaOnTugas: dataTugasMahasiswa,
    });
  } catch (err) {
    console.log("Error updating mata kuliah", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
