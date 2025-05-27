import userService from "../services/user.service.js";

const getProfile = async (req, res) => {
  try {
    const user = await userService.getProfile(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const updatedUser = await userService.updateProfile(req.user.id, req.body);
    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    await userService.changePassword(req.user.id, oldPassword, newPassword);
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getSummary = async (req, res) => {
  try {
    const summary = await userService.getSummary(req.user.id);
    res.json(summary);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

export default {
  getProfile,
  updateProfile,
  changePassword,
  getSummary,
};
