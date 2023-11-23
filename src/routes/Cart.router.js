import {Router} from 'express'
import CartManeger from '../componets-clases/CartManeger.js'
import ProductManeger from '../componets-clases/ProductManeger.js'
const router = Router()

const cartManager = new CartManeger('carritos.json');
const carts = cartManager.getCarts()
const manager = new ProductManeger('productos.json');
const products = manager.getProducts()

router.post('/',async (req,res)=>{
    res.send( await cartManager.addCart())
})

router.get('/:id',(req,res)=>{
    res.send(cartManager.getProducts(req.params.id))    
})

router.post('/:id/product/:pid', async (req,res)=>{
   
    const {id,pid} = req.params
    const checkProduct = manager.getProductById(Number(pid))
    if (checkProduct === 'Not found'){
        res.status(404).json({error:"Producto ausente"})
    }
    res.send(await cartManager.addProductToCart(Number(id),Number(pid)))
   
})


export default router