import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getDosenByParams(req, res) {
  const dosenId = +req.params.id;
  try {
    const where = {
      id: dosenId,
    };

    const dosen = await prisma.dosen.findUnique({
      where: where,
      include: {
        dosenBio: true,
        kelas: true,
        tugas: true,
      },
    });

    return res.status(200).json(dosen);
  } catch (err) {
    console.log("Error finding dosen", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllDosen(req, res) {
  try {
    const dosen = await prisma.dosen.findMany({
      include: {
        dosenBio: true,
        kelas: true,
        tugas: true,
      },
    });
    return res.status(200).json(dosen);
  } catch (err) {
    console.log("Error finding dosen", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteDosen(req, res) {
  const dosenId = +req.params.id;

  if (isNaN(dosenId)) {
    return res.status(400).json({ error: "Invalid dosen ID" });
  }

  try {
    const where = {
      id: dosenId,
    };

    const exist = await prisma.dosen.findUnique({
      where: where,
    });

    if (!exist) {
      return res.status(404).json({ error: "User not found" });
    }

    const dosen = await prisma.dosen.delete({
      where: where,
    });
    return res.status(200).json(dosen);
  } catch (err) {
    console.log("Error deleting dosen", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateDosen(req, res) {
  const dosenId = +req.params.id;
  const body = req.body;

  if (!body.name.trim() || body.name.trim() === "") {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!body.email.trim() || body.email.trim() === "") {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const where = {
      id: dosenId,
    };

    const dataDosen = {
      name: body.name.trim(),
      email: body.email.trim(),
    };

    const dosen = await prisma.dosen.update({
      where: where,
      data: dataDosen,
    });

    return res.status(200).json(dosen);
  } catch (err) {
    console.log("Error updating dosen", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
