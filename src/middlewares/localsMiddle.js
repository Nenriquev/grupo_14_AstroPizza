function localsMiddleware (req, res, next){
    res.locals.user = null
    res.locals.cart = null
   

    if(req.session.userLoggedIn){
        res.locals.user = req.session.userLoggedIn;
    }
    
    if(req.session.cart){
        res.locals.cart = req.session.cart
    }

    

    next()
}

module.exports = localsMiddleware;