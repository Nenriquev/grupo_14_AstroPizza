const path = require('path');
const fs = require('fs');
const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");

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
        } 

        else { 
        const data = findAllUsers();
        const userFound = data.find(function(user){
            return user.email == req.body.email && bcrypt.compareSync(req.body.password, user.password)
        })

            if(!userFound){
                return res.render("users/login", {errorLogin: "Usuario y/o contrasena incorrectos"});
            } 
        
            else {
                req.session.userLoggedIn = {
                    id : userFound.id,
                    name: userFound.names,
                    email: userFound.email,
                    avatar: userFound.image,
                    role: userFound.role
                };
        
                if(req.body.recordame){
                    res.cookie("recordame", userFound.id, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
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

            res.render('users/register', {errors: errors.mapped(), old: req.body})

        } else {

            const data = findAllUsers();

            const newUser = {
                id: data.length + 1,
                names: req.body.names,
                email: req.body.email,
                telefono: req.body.telefono,
                password: bcrypt.hashSync(req.body.password, 10),
                image: req?.file?.filename ? req.file.file : 'default_profile.png'
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
    },

    profile: (req, res) => {
        const errors = validationResult(req);
        const data = findAllUsers();
        const user = data.find(function(users){
            return users.id == req.session.userLoggedIn.id
        })

        res.render('users/profile.ejs', {user: user, errors: errors.mapped()})
    },

    updateProfile: (req, res) =>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
           return usersController.profile(req, res)
        }

        const data = findAllUsers();
        const user = data.find(function(users){
            return users.id == req.session.userLoggedIn.id
        })

        user.names = req.body.names
        user.email = req.body.email
        user.telefono = req.body.telephone
        user.password = req.body.newPassword ? bcrypt.hashSync(req.body.newPassword, 10) : user.password
        user.image = req.file?.filename ? req.file.filename : user.image

        

        writeFile(data)
            
        res.redirect('/')
        
    }

}

module.exports = usersController;