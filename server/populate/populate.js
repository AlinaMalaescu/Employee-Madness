/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const EmployeeModel = require("../db/employee.model");

const EquipmentModel = require("../db/equipment.model");
const equipNames = require("./equipNames.json");
const amount = require("./amount.json");
const types = require("./types.json");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    equipment: [],
    present : false,
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

const populateEquipment = async () => {
  await EquipmentModel.deleteMany({});

  const equipment = equipNames.map((name) => ({
    name,
    type: pick(types),
    amount: pick(amount),
  }));

  await EquipmentModel.create(...equipment);
  console.log("Equipment created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEquipment();

  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
