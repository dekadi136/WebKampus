import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createMataKuliah(req, res) {
  const body = req.body;

  if (!body.name.trim() || body.name.trim() === "") {
    return res.status(400).json({ error: "Matkul name is required" });
  }

  if (!body.sks.trim() || body.sks.trim() == "") {
    return res.status(400).json({ error: "Matkul sks is required" });
  }

  try {
    const dataMataKuliah = {
      name: body.name,
      sks: body.sks,
    };

    const existNim = await prisma.mataKuliah.findUnique({
      where: {
        name: body.name,
      },
    });

    if (existNim) {
      return res.status(409).json({ error: "Matkul code is already exist" });
    }

    const mataKuliah = await prisma.mataKuliah.create({
      data: dataMataKuliah,
    });

    return res.status(201).json({
      message: "Creating mata kuliah successfully",
      data: mataKuliah,
    });
  } catch (err) {
    console.log("Error creating mata kuliah", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getMataKuliahByParams(req, res) {
  const mataKuliahId = +req.params.id;
  try {
    const where = {
      id: mataKuliahId,
    };

    const mataKuliah = await prisma.mataKuliah.findUnique({
      where: where,
      include: {
        kelas: true,
        tugas: true,
      },
    });
    return res.status(200).json(mataKuliah);
  } catch (err) {
    console.log("Error finding mata kuliah", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllMataKuliah(req, res) {
  try {
    const mataKuliah = await prisma.mataKuliah.findMany({
      include: {
        kelas: true,
        tugas: true,
      },
    });
    return res.status(200).json(mataKuliah);
  } catch (err) {
    console.log("Error finding mata kuliah", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteMataKuliah(req, res) {
  const mataKuliahId = +req.params.id;

  if (isNaN(mataKuliahId)) {
    return res.status(400).json({ error: "Invalid mataKuliah ID" });
  }

  try {
    const where = {
      id: mataKuliahId,
    };

    const mataKuliah = await prisma.mataKuliah.delete({
      where: where,
    });

    return res.status(200).json(mataKuliah);
  } catch (err) {
    console.log("Error deleting mata kuliah", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateMataKuliah(req, res) {
  const mataKuliahParamsId = +req.params.id;
  const body = req.body;

  if (!body.code.trim() || body.code.trim() === "") {
    return res.status(400).json({ error: "Matkul code is required" });
  }

  if (!body.name.trim() || body.name.trim() == "") {
    return res.status(400).json({ error: "Matkul name is required" });
  }

  try {
    const where = {
      id: mataKuliahParamsId,
    };

    const dataMataKuliah = {
      name: body.name,
      sks: body.sks,
    };

    const existMataKuliah = await prisma.mataKuliah.findUnique({
      where: where,
    });

    if (!existMataKuliah) {
      return res.status(404).json({ error: "Mata kuliah not found" });
    }

    const mataKuliah = await prisma.mataKuliah.update({
      where: where,
      data: dataMataKuliah,
    });

    return res.status(200).json({
      message: "Update mata kuliah successfully",
      data: mataKuliah,
    });
  } catch (err) {
    console.log("Error updating mata kuliah", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
