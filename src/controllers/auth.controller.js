import authService from "../services/auth.service.js";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      message: "User registered",
      user: userWithoutPassword,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        error: "Unique constraint failed",
        message: "Email is already registered",
      });
    }

    console.error(error);
    res.status(500).json({
      error: "Registration failed",
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);

    // Hapus password dari respons
    const { password: _, ...userWithoutPassword } = user;

    res.json({ message: "Login successful", user: userWithoutPassword, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export default {
  register,
  login,
};
