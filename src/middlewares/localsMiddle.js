function localsMiddleware (req, res, next){
    res.locals.usarios = null

    if(req.session.usuarioLogueado){
        res.locals.usuario = req.session.usuarioLogueado;
    }

    next()
}

module.exports = localsMiddleware;