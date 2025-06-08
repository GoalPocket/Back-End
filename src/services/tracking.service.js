import prisma from "../prisma/client.js";

export const createTracking = async (
  userId,
  { targetName, type, category, amount, notes }
) => {
  // Cari target berdasarkan nama dan userId
  const target = await prisma.target.findFirst({
    where: {
      name: targetName,
      userId: userId,
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

const getTrackingsByUser = async (userId, filters = {}) => {
  // Filter berdasarkan user dan optional query (type, startDate, endDate)
  const where = { userId };
  if (filters.type) where.type = filters.type;
  if (filters.startDate || filters.endDate) {
    where.createdAt = {};
    if (filters.startDate) where.createdAt.gte = new Date(filters.startDate);
    if (filters.endDate) where.createdAt.lte = new Date(filters.endDate);
  }

  return await prisma.tracking.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
};

const getTrackingHistory = async (userId) => {
  return await prisma.tracking.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

const deleteTracking = async (userId, trackingId) => {
  const tracking = await prisma.tracking.findUnique({
    where: { id: trackingId },
  });

  if (!tracking || tracking.userId !== userId) {
    throw new Error("Tracking not found or unauthorized");
  }

  // Sebelum menghapus tracking, sesuaikan kembali nilai summary user
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

  return await prisma.tracking.delete({ where: { id: trackingId } });
};

export default {
  createTracking,
  getTrackingsByUser,
  getTrackingHistory,
  deleteTracking,
};
