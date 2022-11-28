function localsMiddleware (req, res, next){
    res.locals.user = null

    if(req.session.userLoggedIn){
        res.locals.user = req.session.userLoggedIn;
    }

    next()
}

module.exports = localsMiddleware;