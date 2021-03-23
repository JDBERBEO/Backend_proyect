const { Router } = require('express');
const router = Router();
const isAuth = require('../helpers/isAuth')

const {  
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
   
} = require('../controllers/controllers')

router.get('/', home)

router.get('/products', isAuth, getProducts)

router.get('/newProduct', getNewProduct)

router.post('/newProduct', isAuth, createNewProduct) 

router.get('/editproduct/:id', getProduct)

router.delete('/products/:id', deleteProduct);

router.put('/products/:id', editProduct)

// router.get('/polls/:id', votePoll)

// router.post('/polls/:id', voteCounted)

// router.get('/polls/:id/results', getPollresults)


module.exports = router