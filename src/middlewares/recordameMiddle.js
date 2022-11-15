const fs = require('fs');
const path = require('path');

function findAllUsers() {
    const dataJson = fs.readFileSync(path.join(__dirname, '../data/users.json'));
    const data = JSON.parse(dataJson);
    return data
}


function recordame (req, res, next){
    if(req.cookies.recordame && !req.session.userLoggedIn){
        
        const users = findAllUsers();

        const userFound =  users.find(function(user){
            return user.id == req.cookies.recordame
        })

        req.session.userLoggedIn = {
            id: userFound.id,
            name: userFound.names,
            email: userFound.email,
            role: userFound.role
        };
        
    }

    next()
}

module.exports = recordame;