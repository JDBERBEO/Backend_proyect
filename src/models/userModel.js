const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true
      }
})

userSchema.pre('save', function (next) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next();
  } catch (error) {
    next(error)
  }
})

userSchema.methods.passwordMatch = async function (userLoginPassword) {
  try {
    
    return await bcrypt.compare(userLoginPassword, this.password)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = model('User', userSchema)

