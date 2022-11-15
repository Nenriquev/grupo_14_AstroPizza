
  const authMiddleware = {
    
    userLogged: (req, res, next) => {
    if(req.session.userLoggedIn){
      return res.redirect('/')
    }
    next()
  },

    isLoggedOut: (req, res, next) => {
      if(!req.session.userLoggedIn){
        return res.redirect('/users/login')
      }

      next()
    },

    isAdmin: (req, res, next)=> {

      if(!req.session.userLoggedIn || req.session.userLoggedIn.role != 'admin'){
        return res.redirect('/')
      }

      next()
    }
  }

module.exports = authMiddleware

