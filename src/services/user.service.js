import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      address: true,
      country: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) throw new Error("User not found");

  const summary = await getSummary(userId);

  // Gabungkan summary ke dalam user (bukan objek terpisah)
  return {
    ...user,
    ...summary,
  };
};

const updateProfile = async (userId, data) => {
  const { name, phoneNumber, address, country } = data;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { name, phoneNumber, address, country },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      address: true,
      country: true,
      updatedAt: true,
    },
  });

  return updatedUser;
};

const changePassword = async (userId, oldPassword, newPassword) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
  if (!isOldPasswordValid) throw new Error("Old password is incorrect");

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedNewPassword },
  });

  return true;
};

const getSummary = async (userId) => {
  const incomeRecords = await prisma.tracking.findMany({
    where: { userId, type: "income" },
    select: { amount: true },
  });

  const expenseRecords = await prisma.tracking.findMany({
    where: { userId, type: "expense" },
    select: { amount: true },
  });

  const totalIncome = incomeRecords.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expenseRecords.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const avgIncome =
    incomeRecords.length > 0 ? totalIncome / incomeRecords.length : 0;
  const avgExpense =
    expenseRecords.length > 0 ? totalExpense / expenseRecords.length : 0;

  const currentSaving = totalIncome - totalExpense;

  return {
    currentSaving,
    totalIncome,
    totalExpense,
    avgIncome,
    avgExpense,
  };
};

export default {
  getProfile,
  updateProfile,
  changePassword,
  getSummary,
};
