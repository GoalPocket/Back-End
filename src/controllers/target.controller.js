import targetService from "../services/target.service.js";

const createTarget = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = req.body;
    const newTarget = await targetService.createTarget(userId, data);
    res.status(201).json(newTarget);
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return res.status(409).json({
        error: "Unique constraint failed",
        message: "Target name already exists",
      });
    }

    next(err);
  }
};

const getTargets = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const targets = await targetService.getTargetsByUser(userId);
    res.json(targets);
  } catch (err) {
    next(err);
  }
};

const getTarget = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const targetId = req.params.id;
    const target = await targetService.getTargetById(userId, targetId);
    res.json(target);
  } catch (err) {
    next(err);
  }
};

const updateTarget = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const targetId = req.params.id;
    const data = req.body;
    const updatedTarget = await targetService.updateTarget(
      userId,
      targetId,
      data
    );
    res.json(updatedTarget);
  } catch (err) {
    next(err);
  }
};

const deleteTarget = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const targetId = req.params.id;
    await targetService.deleteTarget(userId, targetId);
    res.json({ message: "Target deleted successfully" });
  } catch (err) {
    next(err);
  }
};

const markTargetAsComplete = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const targetId = req.params.id;
    const completedTarget = await targetService.markTargetAsComplete(
      userId,
      targetId
    );
    res.json(completedTarget);
  } catch (err) {
    next(err);
  }
};

export default {
  createTarget,
  getTargets,
  getTarget,
  updateTarget,
  deleteTarget,
  markTargetAsComplete,
};
