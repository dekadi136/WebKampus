import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createMahasiswaBanned(req, res) {
  const body = req.body;

  if (!body.alasan || body.alasan === "") {
    return res.status(400).json({ error: "Alasan must be required" });
  }

  if (!body.mahasiswaId || body.mahasiswaId === "") {
    return res.status(400).json({ error: "Mahasiswa ID must be required" });
  }

  console.log(req.user);

  try {
    const mahasiswaBanned = await prisma.bannedMahasiswa.create({
      data: {
        alasan: body.alasan,
        bannedById: +req.user.id,
        bannedByType: req.user.type,
        mahasiswaId: +body.mahasiswaId,
      },
    });

    return res.status(201).json({
      message: "Banned mahasiswa successfully",
      data: mahasiswaBanned,
    });
  } catch (err) {
    console.log("Error banning mahasiswa", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllMahasiswaBanned(req, res) {
  try {
    const mahasiswaBanned = await prisma.bannedMahasiswa.findMany({
      include: {
        mahasiswa: {
          select: {
            name: true,
          },
        },
      },
    });

    return res.status(200).json({
      data: mahasiswaBanned,
    });
  } catch (err) {
    console.log("Error getting all banned mahasiswa", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteMahasiswaBanned(req, res) {
  const bannedMhsId = +req.params.id;

  if (isNaN(bannedMhsId)) {
    return res.status(400).json({ error: "Mahasiswa banned not found" });
  }

  try {
    const bannedMahasiswa = await prisma.bannedMahasiswa.delete({
      where: {
        id: bannedMhsId,
      },
    });
    return res.status(200).json({
      message: "Delete banned mahasiswa successfully",
      data: bannedMahasiswa,
    });
  } catch (err) {
    console.log("Error delete banned mahasiswa", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
