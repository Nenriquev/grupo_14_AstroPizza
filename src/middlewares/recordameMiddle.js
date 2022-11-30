const fs = require('fs');
const path = require('path');
const db = require('../database/models');


function recordame (req, res, next){

    if(req.cookies.recordame && !req.session.userLoggedIn){
        
        db.User.findByPk(req.cookies.recordame)
         .then((userFound)=>{

             req.session.userLoggedIn = {
                 id: userFound.id,
                 name: userFound.names,
                 email: userFound.email,
                 avatar: userFound.profile_img,
                 role: userFound.role_id
             };
         })

        
    }

    next()
}

module.exports = recordame;