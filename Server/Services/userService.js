const userRepo = require("../Repositories/usersRepo");

const getAllUsers = async () => {
  return await userRepo.getAllUsers();
};

const getUserById = async (id) => {
  return await userRepo.getUserById(id);
};

const getUserByUserId = async (userId) => {
  return await userRepo.getUserByUserId(userId);
};

const addUser = async (user) => {
  await userRepo.addUser(user);
  return "Created";
};

const updateUser = async (id, user) => {
  await userRepo.updateUser(id, user);
  return "Updated";
};

const deleteUser = async (id) => {
  await userRepo.deleteUser(id);
  return "Deleted";
};

const incrementCurrentActions = async (userId) => {
  const user = await userRepo.getUserByUserId(userId);

  if (user.currentActions < user.numOfActions) {
    await userRepo.incrementCurrentActions(userId);
    return "Current actions incremented";
  }
  return "Current actions not incremented";
};

const isActionLimitReached = async (userId) => {
  const user = await userRepo.getUserByUserId(userId);
  return user.currentActions >= user.numOfActions;
};

// error handling is in here because it is a utility function, so it be won't used by the user thus won't be in the controller
const resetCurrentActions = async () => {
  try {
    await userRepo.resetCurrentActions();
    return "Current actions reset";
  } catch (e) {
    console.error("Error resetting current actions:", e.message);
    return "Error resetting current actions";
  }
};

const setLastLogin = async (userId) => {
  await userRepo.setLastLogin(userId);
  return "Last login updated";
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUserId,
  addUser,
  updateUser,
  deleteUser,
  incrementCurrentActions,
  isActionLimitReached,
  resetCurrentActions,
  setLastLogin,
};
