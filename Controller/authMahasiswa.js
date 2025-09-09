import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET;

export async function RegisterMahasiswa(req, res) {
  const body = req.body;

  try {
    const hash = bcrypt.hashSync(body.password, 5);

    // Validate Input User
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

    // Validate Regex
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(body.email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    if (!regexPassword.test(body.password)) {
      return res
        .status(400)
        .json({ error: "Password must be uppercase, lowercase, and number" });
    }

    // Validasi Email
    const emailExist = await prisma.mahasiswa.findUnique({
      where: {
        email: body.email,
      },
    });

    if (emailExist) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Validasi endpoint email
    if (!body.email.trim().endsWith("@student.ac.id")) {
      return res.status(400).json({ error: "Only student email is allowed" });
    }

    const dataMhs = {
      name: body.name,
      email: body.email,
      password: hash,
    };
    const mahasiswa = await prisma.mahasiswa.create({
      data: dataMhs,
    });
    return res.status(201).json({
      message: "Mahasiswa registered successfully",
      data: mahasiswa,
    });
  } catch (err) {
    console.log("Creating Mahasiswa User Error", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function LoginMahasiswa(req, res) {
  const body = req.body;

  // Validate User Input
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
    const mahasiswa = await prisma.mahasiswa.findUnique({
      where: {
        email: body.email.trim(),
      },
    });

    if (!mahasiswa) {
      return res.status(404).json({ error: "Mahasiswa not found" });
    }

    const isPasswordValid = bcrypt.compareSync(
      body.password,
      mahasiswa.password
    );

    if (!isPasswordValid) {
      return res.status(409).json({ error: "Invalid credential" });
    }

    const token = jwt.sign(
      {
        id: mahasiswa.id,
        name: mahasiswa.name,
        email: mahasiswa.email,
        type: "mahasiswa",
        role: mahasiswa.role,
      },
      secret,
      {
        expiresIn: "1h",
      }
    );
    return res.status(200).json({
      message: "Mahasiswa Login sucessfully",
      data: token,
    });
  } catch (err) {
    console.log("Error creating mahasiswa", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
