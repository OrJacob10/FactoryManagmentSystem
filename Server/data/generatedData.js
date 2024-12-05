const employeeModel = require("../Models/employeeModel");
const departmentModel = require("../Models/departmentModel");
const shiftModel = require("../Models/shiftModel");
const shiftEmployeeModel = require("../Models/shiftEmployeeModel");

const generateData = async () => {
  try {
    // Check if departments already exist
    const departmentCount = await departmentModel.countDocuments();
    if (departmentCount > 0) {
      console.log("Data already exists. Skipping data generation.");
      return;
    }

    // Insert departments
    const departments = await departmentModel.insertMany([
      { name: "Production" },
      { name: "Quality Control" },
      { name: "Maintenance" },
      { name: "Logistics" },
      { name: "R&D" },
    ]);
    console.log(`Inserted ${departments.length} departments.`);

    if (!departments || departments.length === 0) {
      throw new Error("Failed to insert departments.");
    }

    // Insert employees
    const employees = await employeeModel.insertMany([
      { firstName: "John", lastName: "Doe", startWork: getRandomYear(), departmentId: departments[0]._id },
      { firstName: "Jane", lastName: "Smith", startWork: getRandomYear(), departmentId: departments[1]._id },
      { firstName: "Michael", lastName: "Johnson", startWork: getRandomYear(), departmentId: departments[2]._id },
      { firstName: "Emily", lastName: "Williams", startWork: getRandomYear(), departmentId: departments[3]._id },
      { firstName: "David", lastName: "Brown", startWork: getRandomYear(), departmentId: departments[4]._id },
      { firstName: "Sarah", lastName: "Taylor", startWork: getRandomYear(), departmentId: departments[0]._id },
      { firstName: "Daniel", lastName: "Anderson", startWork: getRandomYear(), departmentId: departments[1]._id },
      { firstName: "Sophia", lastName: "Thomas", startWork: getRandomYear(), departmentId: departments[2]._id },
      { firstName: "James", lastName: "Jackson", startWork: getRandomYear(), departmentId: departments[3]._id },
      { firstName: "Olivia", lastName: "White", startWork: getRandomYear(), departmentId: departments[4]._id },
      { firstName: "Chris", lastName: "Harris", startWork: getRandomYear(), departmentId: departments[0]._id },
      { firstName: "Emma", lastName: "Martin", startWork: getRandomYear(), departmentId: departments[1]._id },
      { firstName: "Ryan", lastName: "Garcia", startWork: getRandomYear(), departmentId: departments[2]._id },
      { firstName: "Ava", lastName: "Clark", startWork: getRandomYear(), departmentId: departments[3]._id },
      { firstName: "Kevin", lastName: "Rodriguez", startWork: getRandomYear(), departmentId: departments[4]._id },
      { firstName: "Mia", lastName: "Lewis", startWork: getRandomYear(), departmentId: departments[0]._id },
      { firstName: "Robert", lastName: "Lee", startWork: getRandomYear(), departmentId: departments[1]._id },
      { firstName: "Lily", lastName: "Walker", startWork: getRandomYear(), departmentId: departments[2]._id },
      { firstName: "Jason", lastName: "Hall", startWork: getRandomYear(), departmentId: departments[3]._id },
      { firstName: "Isabella", lastName: "Allen", startWork: getRandomYear(), departmentId: departments[4]._id },
    ]);
    console.log(`Inserted ${employees.length} employees.`);

    if (!employees || employees.length === 0) {
      throw new Error("Failed to insert employees.");
    }

    // Assign managers to departments
    for (let i = 0; i < departments.length; i++) {
      const managerIndex = i % employees.length;
      const updatedDepartment = await departmentModel.findByIdAndUpdate(
        departments[i]._id,
        { manager: employees[managerIndex]._id },
        { new: true }
      );

      if (!updatedDepartment) {
        throw new Error(`Failed to assign manager to department ${departments[i]._id}.`);
      }
    }

    // Insert shifts
    const shifts = await shiftModel.insertMany([
      { date: new Date(), startingHour: 8, endingHour: 15 },
      { date: new Date(), startingHour: 9, endingHour: 13 },
      { date: new Date(), startingHour: 8, endingHour: 11 },
      { date: new Date(), startingHour: 10, endingHour: 18 },
      { date: new Date(), startingHour: 11, endingHour: 15 },
    ]);
    console.log(`Inserted ${shifts.length} shifts.`);

    if (!shifts || shifts.length === 0) {
      throw new Error("Failed to insert shifts.");
    }

    // Check for undefined employees and shifts before assignments
    if (!employees || !shifts) {
      throw new Error("Employees or shifts are undefined.");
    }

    // Assign employees to shifts
    await shiftEmployeeModel.insertMany([
      { employeeId: employees[0]._id, shiftId: shifts[0]._id },
      { employeeId: employees[1]._id, shiftId: shifts[1]._id },
      { employeeId: employees[2]._id, shiftId: shifts[2]._id },
      { employeeId: employees[3]._id, shiftId: shifts[3]._id },
      { employeeId: employees[4]._id, shiftId: shifts[4]._id },
      { employeeId: employees[5]._id, shiftId: shifts[0]._id },
      { employeeId: employees[6]._id, shiftId: shifts[1]._id },
      { employeeId: employees[7]._id, shiftId: shifts[2]._id },
      { employeeId: employees[8]._id, shiftId: shifts[3]._id },
      { employeeId: employees[9]._id, shiftId: shifts[4]._id },
      { employeeId: employees[10]._id, shiftId: shifts[0]._id },
      { employeeId: employees[11]._id, shiftId: shifts[1]._id },
      { employeeId: employees[12]._id, shiftId: shifts[2]._id },
      { employeeId: employees[13]._id, shiftId: shifts[3]._id },
      { employeeId: employees[14]._id, shiftId: shifts[4]._id },
      { employeeId: employees[15]._id, shiftId: shifts[0]._id },
      { employeeId: employees[16]._id, shiftId: shifts[1]._id },
      { employeeId: employees[17]._id, shiftId: shifts[2]._id },
      { employeeId: employees[18]._id, shiftId: shifts[3]._id },
      { employeeId: employees[19]._id, shiftId: shifts[4]._id },
      { employeeId: employees[0]._id, shiftId: shifts[1]._id },
      { employeeId: employees[1]._id, shiftId: shifts[2]._id },
      { employeeId: employees[2]._id, shiftId: shifts[3]._id },
      { employeeId: employees[3]._id, shiftId: shifts[4]._id },
      { employeeId: employees[4]._id, shiftId: shifts[0]._id },
      { employeeId: employees[5]._id, shiftId: shifts[1]._id },
      { employeeId: employees[6]._id, shiftId: shifts[2]._id },
      { employeeId: employees[7]._id, shiftId: shifts[3]._id },
      { employeeId: employees[8]._id, shiftId: shifts[4]._id },
      { employeeId: employees[9]._id, shiftId: shifts[0]._id },
      { employeeId: employees[10]._id, shiftId: shifts[1]._id },
      { employeeId: employees[11]._id, shiftId: shifts[2]._id },
      { employeeId: employees[12]._id, shiftId: shifts[3]._id },
      { employeeId: employees[13]._id, shiftId: shifts[4]._id },
      { employeeId: employees[14]._id, shiftId: shifts[0]._id },
      { employeeId: employees[15]._id, shiftId: shifts[1]._id },
      { employeeId: employees[16]._id, shiftId: shifts[2]._id },
      { employeeId: employees[17]._id, shiftId: shifts[3]._id },
      { employeeId: employees[18]._id, shiftId: shifts[4]._id },
      { employeeId: employees[19]._id, shiftId: shifts[0]._id },
    ]);
    console.log("Shift-employee assignments completed.");

    console.log("Data generated successfully.");
  } catch (error) {
    console.error("Error generating data:", error);
  }
};

// Helper function to generate a random start year between 2000 and 2023
const getRandomYear = () =>
  Math.floor(Math.random() * (2023 - 2000 + 1)) + 2000;

module.exports = generateData;
