const User = require('../models/userModel')



const signupUser = (req, res) => {
    res.render('signUpForm')
}

const loginUser = (req,res) => {
    res.render('logInForm')
}

const createUser = async (req, res) => {
    
    try{
        console.log(req.body)
        const { email, password} = req.body
        if(password == ''){
            req.flash('errorPassempty', 'se requiere ingresar una contraseña')
            res.redirect('/signup')
        }
        else {
            const user = new User({ email, password })
            await user.save()
        
            res.redirect('/login')

        }
    
} catch (error) {
    req.flash('errorSignUp', 'User already exists or you miss to fill-in a space in the form')
    res.redirect('/signup')
    console.log(error)
} 

}

const getUser = async (req,res) => {
    const {email, password } = req.body
    const user = await User.findOne({email}) //encuentra la propiedad dentro del objeto que está dentro del arreglo
    console.log(user)
    // method 1 of verifying
    // const userPassword = user[0].password
    
    //   const correctPassword = bcrypt.compareSync(password, userPassword)
   
    if (user) {
        const correctPassword = await user.passwordMatch(password)
        
        if (correctPassword){
            console.log('user exists')
            req.session.userId= user._id
            req.session.userEmail = user.email
            
           
            res.redirect('/products') 
          }
        else {
            console.log('user exists, wrong password written')
            req.flash('errorMsg', 'User or password are incorrect')
            res.redirect('/login')   
        }

      }else {
          console.log('user does not exist')
          req.flash('errorMsg', 'User or password are incorrect')
          res.redirect('/login')
      }
  }

  const logoutUser = (req, res) => {
      req.session.userId= null
      res.redirect('/login')
  }

// //   const encryptPassword = (password) => {
// //     const salt = bcrypt.genSaltSync(10);
// //     const hash = bcrypt.hashSync(password, salt);
    
// //     return hash
// //   }


module.exports = {
   signupUser,
   loginUser,
   createUser,
   getUser,
   logoutUser
 
}