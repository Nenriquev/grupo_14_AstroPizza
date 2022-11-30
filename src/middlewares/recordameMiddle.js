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
                 role_id: userFound.role_id
             };

            console.log(req.session)
         })

        
    }

    next()
}

module.exports = recordame;