const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");

const db = require('../database/models');

const User = db.User;
const Op =  db.Sequelize.Op;
const Orders = db.Order;


const usersController = {

    login: (req, res) => {
        res.render('users/login.ejs', {req: req.query})
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
                res.redirect("/users/login?newUser=success")
            })

        }
    },
    logout: (req, res)=>{
        req.session.destroy()
        res.clearCookie("recordame");
        res.redirect("/")
    },

    profile: async (req, res) => {
        const errors = validationResult(req);
        const orders = await Orders.findAll({
            where: {
              user_id: res.locals.user.id,
            },
            include: [{
                association: "Item",
                include: ["Product", {
                    association: "Extra",
                        include: ["Product"]
                }], 
                
            }]
        
        })

        const date = async (order) => {
          const dates = [];
          order.forEach((item) => {
            let date = new Date(item.createdAt);
            dates.push(date.toLocaleDateString("es-ES"));
          });

          return dates;
        };

        const user = await User.findByPk(req.session.userLoggedIn.id)

         res.render('users/profile.ejs', {user: user, errors: errors.mapped(), orders: orders, date: await date(orders), req: req.query})
        

    },

    updateProfile: (req, res) => {
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

    orderResume: async (req, res) =>{ 
        
       const order = await Orders.findOne({
            where: {
              id: req.params.id,
              user_id: res.locals.user.id,
            },
            include: [{
                association: "Item",
                include: ["Product", {
                    association: "Extra",
                        include: ["Product"]
                }], 
                
            }]
        
        })

        const subtotal = async (order) => {
            let subtotal = []
            order.Item.forEach(element => {
                    let counter = 0;
                    counter = counter + (element.price * element.quantity)
                element.Extra.forEach(extra => {
                    counter = counter + (extra.Product.price * element.quantity)
                })
                subtotal.push(counter)
            }); 
            
            return subtotal
        }

        const date = async (order) => {
            const date = new Date(order.createdAt)
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              };
            return date.toLocaleDateString('es-ES', options)
        }

        if(order){
        res.render('orderResume.ejs', {order: order, subtotal: await subtotal(order), date: await date(order), req: req.query})
        }
        else{
            res.redirect(`/users/profile/${res.locals.user.id}`)
        }
  }
    
}

module.exports = usersController;