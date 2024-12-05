const express = require('express')
const app = express();
const cors = require('cors');
const PORT = 8080;

const clearActionsArray = require('./Server/data/clearActionsFile'); // Adjust the path as needed
clearActionsArray();


require('./Server/configs/database');
require('./Server/jobs/resetUsersActions');
const generateData = require('./Server/data/generatedData')

const initializeDatabase = async () => {
    try {
      await generateData();
      console.log("generating data into the database was successfull!");
    } catch (error) {
      console.error("Error generating data:", error);
    }
  };

initializeDatabase().then(() => {
  app.use(express.json());
  app.use(cors());

  // Set up your controllers
  const authController = require('./Server/Controllers/authController');
  app.use('/auth', authController);

  const userController = require('./Server/Controllers/userController');
  app.use('/users', userController);

  const departmentController = require('./Server/Controllers/departmentController');
  app.use('/departments', departmentController);

  const employeeController = require('./Server/Controllers/employeeController');
  app.use('/employees', employeeController);

  const shiftController = require('./Server/Controllers/shiftController');
  app.use('/shifts', shiftController);

  const shiftEmployeeController = require('./Server/Controllers/shiftEmployeeController');
  app.use('/shiftEmployees', shiftEmployeeController);

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to initialize database:", err);
});