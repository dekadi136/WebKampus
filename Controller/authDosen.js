import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET;

export async function RegisterDosen(req, res) {
  const body = req.body;

  try {
    const hash = bcrypt.hashSync(body.password, 5);

    // VALIDATE INPUT USER
    if (!body.name.trim() || body.name.trim() === "") {
      return res.status(400).json({ error: "Name is required" });
    }

    if (!body.email.trim() || body.email.trim() === "") {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!body.password.trim() || body.password.trim() === "") {
      return res.status(400).json({ error: "Password is required" });
    }

    if (body.password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must at least 6 characters long" });
    }

    // VALIDATE REGEX
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return res.status(409).json({ error: "Invalid email format" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(body.password)) {
      return res
        .status(400)
        .json({ error: "Password must be uppercase, lowercase, and number" });
    }

    // VALIDATE EMAIL ENDPOINT
    if (!body.email.trim().endsWith("@lecture.ac.id")) {
      return res.status(400).json({ error: "Only lecture email is allowed" });
    }

    // VALIDATE IS EMAIL
    const emailExist = await prisma.dosen.findUnique({
      where: {
        email: body.email,
      },
    });

    if (emailExist) {
      return res.status(409).json({ error: "Email is already exist" });
    }

    const dataDosen = {
      name: body.name,
      email: body.email,
      password: hash,
    };

    const dosen = await prisma.dosen.create({
      data: dataDosen,
    });
    return res.status(201).json({
      message: "Creating data dosen successfully",
      data: dosen,
    });
  } catch (err) {
    console.log("Creating Mahasiswa User Error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function LoginDosen(req, res) {
  const body = req.body;

  if (!body.email.trim() || body.email.trim() === "") {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!body.password.trim() || body.password.trim() === "") {
    return res.status(400).json({ error: "Password is required" });
  }

  if (body.password.length < 6) {
    return res
      .status(400)
      .json({ error: "Password must at least 6 characters long" });
  }

  try {
    const dosen = await prisma.dosen.findUnique({
      where: {
        email: body.email.trim(),
      },
    });

    if (!dosen) {
      return res.status(404).json({ error: "Dosen not found" });
    }

    const isPasswordValid = bcrypt.compareSync(body.password, dosen.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credential" });
    }

    const token = jwt.sign(
      {
        id: dosen.id,
        name: dosen.name,
        email: dosen.email,
        type: "dosen",
        role: "dosen",
      },
      secret,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({
      message: "Dosen login successfully",
      token: token,
    });
  } catch (err) {
    console.log("Error creating mahasiswa", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
