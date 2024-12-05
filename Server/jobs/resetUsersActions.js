const cron = require("node-cron");
const userService = require("../Services/userService");

cron.schedule("0 0 * * *", async () => {
  try {
    await userService.resetCurrentActions(); // Reset all user actions
    return "all users current actions has been reseted successfully"
  } catch (error) {
    console.error("Error during midnight reset:", error);
    return "Error during midnight reset";
  }
});
