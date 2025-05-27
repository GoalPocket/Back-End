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

    // Jangan kirim password ke client
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      message: "User registered",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Registration failed",
      message: "email has been registered",
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
