const express = require('express')
const path = require('path')
const hbs = require('express-handlebars')
const morgan = require('morgan');
const methodOverride = require('method-override')
const userRouter = require('./routes/userRoutes')
const router= require('./routes/routes')
const session = require('express-session')
const flash = require('connect-flash');
const { extname } = require('path');
const dotenv = require('dotenv')

const app = express ()
dotenv.config()

//Connect to Db.
require('./database/dbConnect')

//Setting Handlebars
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', hbs({
    defaultLayout: 'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))

app.set('view engine', '.hbs')

//Middlewares
app.use(morgan('dev'))
//app.use(path.join(__dirname, express.static('public')))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(session({
    secret: process.env.SECRET_WORD || 'secretWord', //palabra secreta 
    cookie: { maxAge: 10000*60   } //tiempo que dura la sesión abieta
  }))
app.use(flash())

//Global Variables 
app.use((req,res, next)=> {
    res.locals.user = req.session.userId
    res.locals.errorMsg = req.flash('errorMsg')
    res.locals.errorSignUp = req.flash('errorSignUp')
    res.locals.errorPassempty = req.flash('errorPassempty')
    next()
})


//Routes and Controllers
app.use(router)
app.use(userRouter)

const PORT = process.env.PORT || 3000
const result = dotenv.config()
console.log(result.parsed)

//Listening Server

app.listen(PORT, ()=>console.log(`Server running in port ${PORT}`))
