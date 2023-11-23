import express from 'express';
import productoRouter from   '../src/routes/Producto.router.js'
import cartRouter from '../src/routes/Cart.router.js'



const app = express()
const port = 5000;


//middlewears


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/products',productoRouter)
app.use('/api/carts',cartRouter)



 app.listen(port, ()=> console.log(`Puerto abierto en: ${port}`));
