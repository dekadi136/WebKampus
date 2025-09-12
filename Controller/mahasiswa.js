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
        tugas: {
          include: {
            tugas: {
              include: {
                dosen: true,
                mataKuliah: true,
              },
            },
          },
        },
        kelas: {
          include: {
            kelas: {
              include: {
                dosen: true,
                mataKuliah: true,
              },
            },
          },
        },
        banned: true,
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
        tugas: {
          include: {
            tugas: {
              select: {
                name: true,
                jadwal: true,
                status: true,
                dosen: {
                  select: {
                    name: true,
                  },
                },
                mataKuliah: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        kelas: {
          select: {
            kelas: {
              select: {
                ruangan: true,
                hari: true,
                jam: true,
                dosen: {
                  select: {
                    name: true,
                  },
                },
                mataKuliah: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            mahasiswa: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        banned: true,
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
      status: body.status.trim(),
      role: body.role.trim(),
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

export async function promotMahasiswaKorti(req, res) {
  const mahasiswaId = +req.params.id;

  try {
    const where = {
      id: mahasiswaId,
    };

    const isExist = await prisma.mahasiswa.findUnique({
      where: where,
    });

    if (!isExist) {
      return res.status(404).json({ error: "Mahasiswa not found" });
    }

    if (isExist.role === "korti") {
      return res.status(409).json({ error: "Mahasiswa role invalid" });
    }

    const dataPromotMahasiswaKorti = {
      role: "korti",
    };

    const promotMhsKorti = await prisma.mahasiswa.update({
      where: where,
      data: dataPromotMahasiswaKorti,
    });

    return res.status(200).json({
      message: "Promoting mahasiswa korti successfully",
      data: promotMhsKorti,
    });
  } catch (err) {
    console.log("Error promoting mahasiswa korti", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function unpromotMahasiswaKorti(req, res) {
  const mahasiswaId = +req.params.id;

  try {
    const where = {
      id: mahasiswaId,
    };

    const isExist = await prisma.mahasiswa.findUnique({
      where: where,
    });

    if (!isExist) {
      return res.status(404).json({ error: "Mahasiswa not found" });
    }

    if (isExist.role === "mahasiswa") {
      return res.status(409).json({ error: "Mahasiswa role invalid" });
    }

    if (isExist.role === "korti") {
      return res
        .status(409)
        .json({ error: "Korti cant unpromote other korti" });
    }

    const dataPromotMahasiswaKorti = {
      role: "mahasiswa",
    };

    const promotMhsKorti = await prisma.mahasiswa.update({
      where: where,
      data: dataPromotMahasiswaKorti,
    });

    return res.status(200).json({
      message: "Unpromoting mahasiswa korti successfully",
      data: promotMhsKorti,
    });
  } catch (err) {
    console.log("Error unpromoting mahasiswa korti", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
