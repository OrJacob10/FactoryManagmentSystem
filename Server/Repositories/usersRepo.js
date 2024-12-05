const userModel = require("../Models/userModel");

const getAllUsers = () => {
  return userModel.find({});
};

const getUserById = (id) => {
  return userModel.findById(id);
};

const getUserByUserId = (userId) => {
  return userModel.findOne({ userId: userId });
};

const addUser = (user) => {
  const newUser = new userModel({ ...user, currentActions: 0 });
  return newUser.save();
};

const updateUserByUserId = (userId, user) => {
  return userModel.findOneAndUpdate({ userId: userId }, user);
};

const updateUser = (id, user) => {
  return userModel.findByIdAndUpdate(id, user);
};

const deleteUser = (id) => {
  return userModel.findByIdAndDelete(id);
};

const incrementCurrentActions = async (userId) => {
  const user = await userModel.findOne({ userId: userId });
  user.currentActions++;
  await userModel.updateOne({ userId: userId }, user);
};

const resetCurrentActions = async () => {
  await userModel.updateMany({}, { currentActions: 0 });
};

const setLastLogin = async (userId) => {
  const user = await userModel.findOne({ userId: userId });
  user.lastLogin = new Date();
  user.lastLogin.setHours(user.lastLogin.getHours() + 3);
  await userModel.updateOne({ userId: userId }, user);
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUserId,
  updateUserByUserId,
  addUser,
  updateUser,
  deleteUser,
  incrementCurrentActions,
  resetCurrentActions,
  setLastLogin,
};
