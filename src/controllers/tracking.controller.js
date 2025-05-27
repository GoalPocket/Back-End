import trackingService from "../services/tracking.service.js";

export const createTracking = async (req, res) => {
  try {
    const userId = req.user.id; // pastikan middleware JWT menyimpan user ID di req.user
    const tracking = await trackingService.createTracking(userId, req.body);
    res.json(tracking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getTrackings = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const filters = {
      type: req.query.type,
      startDate: req.query.startDate,
      endDate: req.query.endDate,
    };
    const trackings = await trackingService.getTrackingsByUser(userId, filters);
    res.json(trackings);
  } catch (err) {
    next(err);
  }
};

const getTrackingHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const history = await trackingService.getTrackingHistory(userId);
    res.json(history);
  } catch (err) {
    next(err);
  }
};

const deleteTracking = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const trackingId = req.params.id;
    await trackingService.deleteTracking(userId, trackingId);
    res.json({ message: "Tracking deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export default {
  createTracking,
  getTrackings,
  getTrackingHistory,
  deleteTracking,
};
