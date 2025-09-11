import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllMahasiswaOnKelas(req, res) {
  try {
    const mahasiswaOnKelas = await prisma.mahasiswaOnKelas.findMany({
      include: {
        mahasiswa: true,
        kelas: true,
      },
    });

    return res.status(200).json({
      data: mahasiswaOnKelas,
    });
  } catch (err) {}
}
