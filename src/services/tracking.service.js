import prisma from "../prisma/client.js";

export const createTracking = async (
  userId,
  { targetName, type, category, amount, notes }
) => {
  const target = await prisma.target.findFirst({
    where: {
      name: targetName,
      userId: userId,
    },
  });

  if (!target) {
    throw new Error("Target not found for this user");
  }

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

  return tracking;
};

const getTrackingsByUser = async (userId, filters = {}) => {
  // filters bisa berupa: type, startDate, endDate
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
  if (!tracking || tracking.userId !== userId)
    throw new Error("Tracking not found or unauthorized");

  return await prisma.tracking.delete({ where: { id: trackingId } });
};

export default {
  createTracking,
  getTrackingsByUser,
  getTrackingHistory,
  deleteTracking,
};
