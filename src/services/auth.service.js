import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

const register = async (data) => {
  const { name, email, password } = data;

  // Cek user sudah ada atau belum
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error("Email already registered");

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      currentSaving: 0,
      totalIncome: 0,
      totalExpense: 0,
      avgIncome: 0,
      avgExpense: 0,
    },
  });

  return user;
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid email or password");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Invalid email or password");

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  return { user, token };
};

export default {
  register,
  login,
};
