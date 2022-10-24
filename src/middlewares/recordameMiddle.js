const fs = require('fs');
const path = require('path');

function findAllUsers() {
    const dataJson = fs.readFileSync(path.join(__dirname, '../data/users.json'));
    const data = JSON.parse(dataJson);
    return data
}


function recordame (req, res, next){
    if(req.cookies.recordame && !req.session.usuarioLogueado){

        const users = findAll();

        const userFound =  users.find(function(user){
            return user.id == req.cookies.recordame
        })

        req.session.usuarioLogueado = {
            id: userFound.id,
            name: userFound.first_name,
            email: userFound.email
        };
        
    }

    next()
}

module.exports = recordame;