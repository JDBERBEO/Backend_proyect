const Product = require('../models/products')
// const User = require('../models/userModel')

const home = async (req, res) => {
    res.render('home')
}
const getProducts = async (req, res) => {
    let products = await Product.find({user: res.locals.user}).lean();
    console.log(products)
    let pricesPaid= [0]
    let pricesUnpaid = [0]
    let totalSale= [0]
    let pricesSum= products.map(product =>  [product.price, product.paymentStatus, product.quantityBought]) 
    //cantidad vendida

    
    //total recaudado y total adeudado
    pricesSum = pricesSum.filter(prod => 
        {
            if (prod[1]==='si' && prod[2]) {
                pricesPaid.push(prod[0])
                totalSale.push(prod[2])
            }
           
            else if (prod[1]==='no' && prod[2]){
                pricesUnpaid.push(prod[0])
                totalSale.push(prod[2])
            }
        }
    )
   
    pricesPaid = pricesPaid.reduce(((a, b) => a + b))
    pricesUnpaid = pricesUnpaid.reduce(((a, b) => a + b))
    totalSale = totalSale.reduce(((a, b) => a + b))
    res.render('products', { products, pricesPaid, pricesUnpaid, totalSale });
      } 

const getNewProduct = (req, res) => {
        res.render('newProductForm')
}

const createNewProduct = async (req, res) => {

    const product = new Product({
            productName: req.body.productName,
            productType: req.body.productType,
            buyer: req.body.buyer,
            paymentStatus: req.body.paymentStatus,
            deliverStatus: req.body.deliverStatus,
            price: req.body.price,
            quantityBought: req.body.quantityBought,
            user: res.locals.user
    })

    await product.save()
    res.redirect('/products')

}



const deleteProduct = async (req, res) => {
       
        const { id } = req.params;
        await Product.findByIdAndDelete(id);

        res.redirect('/products');
}

const  getProduct = async (req,res) => {
            const { id } = req.params;
            const task = await Product.findById(id);
            res.render('editProductForm', task)


}

const editProduct = async (req, res) => {
        const {  productName, productType, buyer, paymentStatus, deliverStatus, price, quantityBought } = req.body
        const { id } = req.params;
        await Product.findByIdAndUpdate(id, {  productName, productType, buyer, paymentStatus, deliverStatus, price, quantityBought });
        // console.log(req.body)
        res.redirect('/products');
  }

// const votePoll = async (req, res) => {
        
//         const { id } = req.params;
//         const votePoll = await Poll.findById(id);
//         res.render('voteForm', votePoll)
// }

// const voteCounted = async (req, res) => {
        


//     //counts one vote on OptionOne
       
//         const { id } = req.params;
//         const poll = await Poll.findById(id);
    
//         console.log(req.body.flexRadioDefault)
//         console.log(poll.optionTwo.value)
//         if (req.body.flexRadioDefault === poll.optionOne.value ) {
//             poll.optionOne.votes++
//         }

//         else if (req.body.flexRadioDefault === poll.optionTwo.value) {
//             poll.optionTwo.votes++
//         }
        

//         await poll.save();

//         res.redirect(`/polls/${id}/results`); 
// }

// const getPollresults = async (req, res) => {
//     const { id } = req.params;
//     const resultsPoll = await Poll.findById(id);
//     res.render('voteResults', resultsPoll)
    
// }

module.exports = {
    
    home,
    getProducts,
    getNewProduct,
    createNewProduct,
    deleteProduct,
    getProduct,
    editProduct
    // votePoll,
    // voteCounted,
    // getPollresults
}