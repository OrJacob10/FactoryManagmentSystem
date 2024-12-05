const jwt = require("jsonwebtoken");
const userService = require("../Services/userService");
const SECRET_KEY = "OrJacob2001";
const jFile = require("jsonfile");
const path = require("path");

const actionsFilePath = path.join(__dirname, "../data/actionsTracker.json");
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const actionsHandler = async (req, res, next) => {
  const userId = jwt.verify(req.headers.token, SECRET_KEY).userId;
  const now = new Date();
  const user = await userService.getUserByUserId(userId);

  const lastLogin = new Date(user.lastLogin);
  console.log(
    "last login: " + lastLogin.getDate() + ", time now: " + now.getDate()
  );

  // check if the day changed, if its true than reset actions to 0, and saves the date of today
  if (lastLogin.getDate() != now.getDate()) {
    await userService.setLastLogin(userId);
    await userService.resetCurrentActions();
  }
  // check if the user reached the maximun actions limit, if he does than user will be logged out
  const isReached = await userService.isActionLimitReached(userId);
  if (isReached) {
    return res.status(429).json({
      success: false,
      message:
        "You have reached the maximun actions allowed, please try again tomorrow.",
    });
  }
  // increment user's current actions
  await userService.incrementCurrentActions(userId);
  const updatedUser = await userService.getUserByUserId(userId);
  console.log(updatedUser.numOfActions);
  console.log(updatedUser.currentActions);
  // add new action document to the json file
  const actionsArr = await jFile.readFile(actionsFilePath);
  const newActionsArr = [
    ...actionsArr.actions,
    {
      id: userId,
      maxActions: updatedUser.numOfActions,
      date: formatDate(now),
      actionsAllowed: updatedUser.numOfActions - updatedUser.currentActions,
    },
  ];
  await jFile.writeFile(actionsFilePath, { actions: newActionsArr });

  // continue to the next middleware (in this case the controller)
  next();
};

module.exports = actionsHandler;
