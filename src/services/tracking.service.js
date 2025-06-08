import prisma from "../prisma/client.js";

export const createTracking = async (
  userId,
  { targetName, type, category, amount, notes }
) => {
  // Cari target berdasarkan nama dan userId
  const target = await prisma.target.findFirst({
    where: {
      name: targetName,
      userId,
    },
  });

  if (!target) {
    throw new Error("Target not found for this user");
  }

  // Buat tracking baru
  const tracking = await prisma.tracking.create({
    data: {
      userId,
      targetId: target.id,
      type,
      category,
      amount,
      notes,
    },
  });

  // Update summary di tabel User
  const userUpdateData = {
    currentSaving:
      type === "income" ? { increment: amount } : { decrement: amount },
  };

  if (type === "income") {
    userUpdateData.totalIncome = { increment: amount };
  } else if (type === "expense") {
    userUpdateData.totalExpense = { increment: amount };
  }

  await prisma.user.update({
    where: { id: userId },
    data: userUpdateData,
  });

  return tracking;
};

export const getTrackingsByUser = async (userId, filters = {}) => {
  const where = { userId };

  if (filters.type) where.type = filters.type;
  if (filters.startDate || filters.endDate) {
    where.createdAt = {};
    if (filters.startDate) where.createdAt.gte = new Date(filters.startDate);
    if (filters.endDate) where.createdAt.lte = new Date(filters.endDate);
  }

  return prisma.tracking.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

export const getTrackingHistory = async (userId) => {
  return prisma.tracking.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const deleteTracking = async (userId, trackingId) => {
  const tracking = await prisma.tracking.findUnique({
    where: { id: trackingId },
  });

  if (!tracking || tracking.userId !== userId) {
    throw new Error("Tracking not found or unauthorized");
  }

  // Koreksi summary user sebelum hapus tracking
  const adjustment = {
    currentSaving:
      tracking.type === "income"
        ? { decrement: tracking.amount }
        : { increment: tracking.amount },
  };

  if (tracking.type === "income") {
    adjustment.totalIncome = { decrement: tracking.amount };
  } else if (tracking.type === "expense") {
    adjustment.totalExpense = { decrement: tracking.amount };
  }

  await prisma.user.update({
    where: { id: userId },
    data: adjustment,
  });

  return prisma.tracking.delete({ where: { id: trackingId } });
};

export default {
  createTracking,
  getTrackingsByUser,
  getTrackingHistory,
  deleteTracking,
};
