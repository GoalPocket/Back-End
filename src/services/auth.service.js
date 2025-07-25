import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";
const register = async (data) => {
  const { name, email, password } = data;
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
    },
  });

  return user;
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  if (!user) throw new Error("Invalid email or password");
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("Invalid email or password");
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "7d",
  });

  // Return hanya field yang penting
  const minimalUser = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return { user: minimalUser, token };
};

export default {
  register,
  login,
};
