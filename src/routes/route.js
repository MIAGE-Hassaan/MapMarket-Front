const express = require('express');
const router = express.Router();
const userController = require('../pages/EmployeeManagement');
const EmployeeManagement = require("../pages/EmployeeManagement");

router.get('/utilisateurs', EmployeeManagement.getUsers)