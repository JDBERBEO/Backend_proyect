const { Schema, model } = require('mongoose');

const productsSchema = new Schema({
    
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },

  productName: String,
  productType: String,
  buyer: String,
  paymentStatus: String,
  deliverStatus: String,
  price: Number,
  totalCollected: Number,
  quantityBought: Number,
  status: {
        type: Boolean,
        default: false
      }
})

module.exports = model('Product', productsSchema)