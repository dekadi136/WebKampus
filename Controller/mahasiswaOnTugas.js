import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllMahasiswaOnTugas(req, res) {
  try {
    const mahasiswaOnTugas = await prisma.mahasiswaOnTugas.findMany({
      include: {
        mahasiswa: true,
        tugas: true,
      },
    });

    return res.status(200).json({
      data: mahasiswaOnTugas,
    });
  } catch (err) {
    console.log("Error getting mahasiswaOnTugas", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
