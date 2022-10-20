const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');

function findAllUsers() {
    const dataJson = fs.readFileSync(path.join(__dirname, '../data/users.json'));
    const data = JSON.parse(dataJson);
    return data
}

function writeFile(data) {
    const dataStringify = JSON.stringify(data, null, 5);
    fs.writeFileSync(path.join(__dirname, '../data/users.json'), dataStringify);
}

const usersController = {

    login: (req, res) => {
        res.render('users/login.ejs')
      },
    register: (req, res) => {
        res.render('users/register.ejs')
    },
    newUser: (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){

            res.render('users/register', {errors: errors.array()})

        } else {

            const data = findAllUsers();

            const newUser = {
                id: data.length + 1,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                telefono: req.body.telefono,
                password: req.body.password,
                image: req.file.filename
            }
    
            data.push(newUser);
    
            writeFile(data);
    
            res.redirect('/users/login')
        }
    }
}

module.exports = usersController;