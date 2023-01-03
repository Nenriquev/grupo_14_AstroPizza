
const cartMiddleware = {
    
  userLogged: (req, res, next) => {
     if(!req.session.userLoggedIn){
      res.redirect('/users/login')
    } 
    next()
}

}

module.exports = cartMiddleware