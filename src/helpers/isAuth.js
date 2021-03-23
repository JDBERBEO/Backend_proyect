const isAuth = (req, res, next) => {
    const { userId } = req.session
    if (!userId) {
        res.redirect('/login');
    }else{
        next();
    }
}

module.exports = isAuth