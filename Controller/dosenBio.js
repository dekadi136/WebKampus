import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createDosenBio(req, res) {
  const body = req.body;

  if (!body.nidn.trim() || body.nidn.trim() === "") {
    return res.status(400).json({ error: "Nidn is required" });
  }

  if (!body.status.trim() || body.status.trim() == "") {
    return res.status(400).json({ error: "Status is required" });
  }

  try {
    const dataDosenBio = {
      nidn: body.nidn,
      status: body.status,
      dosenId: +req.user.id,
    };

    const existNidn = await prisma.dosenBio.findUnique({
      where: {
        nidn: body.nidn,
      },
    });

    if (existNidn) {
      return res.status(409).json({ error: "NIDN is already exist" });
    }

    const dosenBio = await prisma.dosenBio.create({
      data: dataDosenBio,
    });

    return res.status(201).json({
      message: "Creating dosen bio successfully",
      data: dosenBio,
    });
  } catch (err) {
    console.log("Error creating dosen bio", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getDosenBioByParams(req, res) {
  const dosenBioId = +req.params.id;
  try {
    const where = {
      id: dosenBioId,
    };

    const dosenBio = await prisma.dosenBio.findUnique({
      where: where,
    });
    return res.status(200).json(dosenBio);
  } catch (err) {
    console.log("Error finding dosen Bio", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllDosenBio(req, res) {
  try {
    const dosenBios = await prisma.dosenBio.findMany();
    return res.status(200).json(dosenBios);
  } catch (err) {
    console.log("Error finding dosen Bio", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteDosenBio(req, res) {
  const dosenBioId = +req.params.id;

  if (isNaN(dosenBioId)) {
    return res.status(400).json({ error: "Invalid dosenBio ID" });
  }

  try {
    const where = {
      id: dosenBioId,
    };

    const exist = await prisma.dosenBio.findUnique({
      where: where,
    });

    if (exist.dosenId !== req.user.id) {
      return res.status(404).json({ error: "Unknown authorized" });
    }

    if (!exist) {
      return res.status(404).json({ error: "dosenBio not found" });
    }

    const dosenBio = await prisma.dosenBio.delete({
      where: where,
    });
    return res.status(200).json(dosenBio);
  } catch (err) {
    console.log("Error deleting mahasiswaBio", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateDosenBio(req, res) {
  const dosenBioDosenId = +req.params.id;
  const body = req.body;

  if (!body.nidn.trim() || body.nidn.trim() === "") {
    return res.status(400).json({ error: "Nidn is required" });
  }

  if (!body.status.trim() || body.status.trim() == "") {
    return res.status(400).json({ error: "Status is required" });
  }

  try {
    const where = {
      id: dosenBioDosenId,
    };

    const dataDosenBio = {
      nidn: body.nidn,
      status: body.status,
      dosenId: +req.user.id,
    };

    const dosenBioId = await prisma.dosenBio.findUnique({
      where: where,
    });

    if (dosenBioId.dosenId !== req.user.id) {
      return res.status(404).json({ error: "Unknown authorized" });
    }

    const dosenBio = await prisma.dosenBio.update({
      where: where,
      data: dataDosenBio,
    });

    return res.status(200).json({
      message: "Update dosen bio successfully",
      data: dosenBio,
    });
  } catch (err) {
    console.log("Error updating dosen Bio", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
