import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const employees = require('../data/employees.json');
const data = {}
data.employees = employees;

export const getAllEmployees = (req, res, next) => {
    res.json(data.employees)
};

export const createNewEmployee = (req, res) => {
    console.log(req)
    res.json(
        {
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        }
    )
};

export const updateEmployee = (req, res) => {
    res.json(
        {
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        }
    )
};

export const deleteEmployee = (req, res) => {
    res.json({
        "id": req.body.id
    })
};

export const findEmployee = (req, res) => {
    res.json({
        "id": req.params.id
    })
};

// module.exports = {
//     getAllEmployees,
//     createNewEmployee,
//     updateEmployee,
//     deleteEmployee,
//     findEmployee
// }