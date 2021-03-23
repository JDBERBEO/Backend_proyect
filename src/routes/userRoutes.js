const { Router } = require ('express');
const userRouter = Router ()

const { signupUser, 
        loginUser,
        createUser, 
        getUser,
        logoutUser
    } = require('../controllers/userControllers');


userRouter.get ('/signup', signupUser)

userRouter.get ('/login', loginUser)

userRouter.post ('/users', createUser)

userRouter.post ('/users/login', getUser)

userRouter.get ('/logout', logoutUser)


module.exports = userRouter
