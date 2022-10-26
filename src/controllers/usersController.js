const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt")
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

    loginProcess: (req , res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){

            res.render('users/login', {errorLogin: "Usuario y/o contrasena incorrectos"}) 

        } else { 

        const data = findAllUsers();

        const userFound = data.find(function(user){
            return user.email == req.body.email && bcrypt.compareSync(req.body.password, user.password)
        })

        if(!userFound){
            return res.render("users/login", {errorLogin: "Usuario y/o contrasena incorrectos"});
        } else {
            
            req.session.usuarioLogueado = {
                id : userFound.id,
                name: userFound.first_name,
                email: userFound.email
            };
    
            if(req.body.recordame){
                res.cookie("recordame", userFound.id)
            }
            res.redirect("/")
        }
        

        }

            
        
    },
    register: (req, res) => {
        res.render('users/register.ejs')
    },
    newUser: (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){

            res.render('users/register', {errors: errors.mapped()})

        } else {

            const data = findAllUsers();

            const newUser = {
                id: data.length + 1,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                telefono: req.body.telefono,
                password: bcrypt.hashSync(req.body.password, 10),
                image: req.file.filename
            }
    
            data.push(newUser);
    
            writeFile(data);
    
            res.redirect('/users/login')
        }
    },
    logout: (req, res)=>{
        req.session.destroy()
        res.clearCookie("recordame");
        res.redirect("/")
    }
}

module.exports = usersController;