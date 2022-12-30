const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");

const db = require('../database/models');
const Product = require('../database/models/Product');
const User = db.User;
const Op =  db.Sequelize.Op;


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

            User.findAll()
            .then((data) => {

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
                        avatar: userFound.profile_img,
                        role: userFound.role_id
                    };
            
                    if(req.body.recordame){
                        res.cookie("recordame", userFound.id, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
                    }
                    res.redirect("/")
                }
    
                
            })
            .catch((err) => {
                console.log(err)
            })
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

            User.create({

                names: req.body.names,
                email: req.body.email,
                telephone: req.body.telefono,
                password: bcrypt.hashSync(req.body.password, 10),
                profile_img: req?.file?.filename ? req.file.filename : 'default_profile.png'

            })
            .then((user)=>{
                res.redirect('/users/login')
            })

        }
    },
    logout: (req, res)=>{
        req.session.destroy()
        res.clearCookie("recordame");
        res.redirect("/")
    },

    profile: (req, res) => {
        const errors = validationResult(req);

        User.findByPk(req.session.userLoggedIn.id)
        .then((user) => {

            res.render('users/profile.ejs', {user: user, errors: errors.mapped(), req: req.query})
        })

    },

    updateProfile: (req, res) =>{
        const errors = validationResult(req);

        if(!errors.isEmpty()){
           return usersController.profile(req, res)
        }

        User.findByPk(req.session.userLoggedIn.id)
        .then((user) => {

            User.update({
                names: req.body.names,
                email: req.body.email,
                telephone: req.body.telephone,
                password: req.body.newPassword ? bcrypt.hashSync(req.body.newPassword, 10) : user.password,
                profile_img: req.file?.filename ? req.file.filename : user.profile_img
            }, {
                where: {
                    id: req.session.userLoggedIn.id
                }
            })
        })
            
        res.redirect(`/users/profile/${req.session.userLoggedIn.id}?update=profile`)
        
    },

    orderResume: async = (req, res) =>{    
        res.render('orderResume.ejs')
  }
    
}

module.exports = usersController;