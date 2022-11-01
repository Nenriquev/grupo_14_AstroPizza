
  const authMiddleware = {
    
    userLogged: (req, res, next) => {
    if(req.session.usuarioLogueado){
      return res.redirect('/')
    }
    next()
  },

    isLoggedOut: (req, res, next) => {
      if(!req.session.usuarioLogueado){
        return res.redirect('/users/login')
      }

      next()
    }
}

module.exports = authMiddleware

