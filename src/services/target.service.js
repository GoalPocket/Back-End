import prisma from "../prisma/client.js";

const createTarget = async (userId, data) => {
  return await prisma.target.create({
    data: {
      userId,
      name: data.name,
      targetAmount: data.targetAmount,
      duration: data.duration,
      initialSaving: data.initialSaving,
      incomeFrequency: data.incomeFrequency,
      fixedIncome: data.fixedIncome,
      fixedOutcome: data.fixedOutcome,
      isCompleted: false,
    },
  });
};

const getTargetsByUser = async (userId) => {
  return await prisma.target.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

const getTargetById = async (userId, targetId) => {
  const target = await prisma.target.findUnique({ where: { id: targetId } });
  if (!target || target.userId !== userId)
    throw new Error("Target not found or unauthorized");
  return target;
};

const updateTarget = async (userId, targetId, data) => {
  const target = await prisma.target.findUnique({ where: { id: targetId } });
  if (!target || target.userId !== userId)
    throw new Error("Target not found or unauthorized");

  return await prisma.target.update({
    where: { id: targetId },
    data,
  });
};

const deleteTarget = async (userId, targetId) => {
  const target = await prisma.target.findUnique({ where: { id: targetId } });
  if (!target || target.userId !== userId)
    throw new Error("Target not found or unauthorized");

  return await prisma.target.delete({ where: { id: targetId } });
};

const markTargetAsComplete = async (userId, targetId) => {
  return updateTarget(userId, targetId, { isCompleted: true });
};

export default {
  createTarget,
  getTargetsByUser,
  getTargetById,
  updateTarget,
  deleteTarget,
  markTargetAsComplete,
};
