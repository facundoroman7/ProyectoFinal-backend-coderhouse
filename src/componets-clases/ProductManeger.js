import {promises as fs} from "fs"

export default class ProductManeger {
    constructor(){
        this.patch = "./productos.txt";
        this.prods = [];
    }

    static id = 0


    addProduct = async (title, description, price, thumbnail, code, stock ) =>{

        ProductManeger.id++

        let newProducto = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManeger.id
        };


        this.prods.push(newProducto)

        

        await fs.writeFile(this.patch, JSON.stringify(this.prods))
    };


    readProduct = async () =>{
        let res = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(res)
    }

    getProducts = async () =>{
        let esperandoPromise = await this.readProduct()
       return console.log(esperandoPromise);
    };


    getProductById = async (id) =>{
        let esperandoOtraPromise = await this.readProduct()
        let filtrado = esperandoOtraPromise.find((prod) => prod.id === id)

       console.log(filtrado);
    }


    deleteProductById =  async (id) => {
        let esperandoOtraPromise = await this.readProduct()

        let prodFiltrado = esperandoOtraPromise.filter(products => products.id != id)

        await fs.writeFile(this.patch, JSON.stringify(prodFiltrado))
        
    }; 


    UpdateProduct = async ({id, ...productos}) =>{
        await this.deleteProductById(id);
        let prodviejo = await this.readProduct()
        console.log(prodviejo);
        let modicarProd = [
            {id, ...productos},
            ...prodviejo
        ]
        await fs.writeFile(this.patch, JSON.stringify(modicarProd))
    }

}


// const productos = new ProductManeger()

// productos.addProduct('Producto A', 'Descripción A', 21.99, 'thumbnail1.jpg', 'Atf321', 13)
// productos.addProduct('Producto B', 'Descripción B', 55.99, 'thumbnail2.jpg', 'RET456', 825);
// productos.addProduct('Producto c', 'Descripción c', 155.99, 'thumbnail3.jpg', 'AET456', 925);
// productos.addProduct('Producto d', 'Descripción d', 255.99, 'thumbnail4.jpg', 'BET456', 7825);
// productos.addProduct('Producto e', 'Descripción e', 535.99, 'thumbnail5.jpg', 'RDET456', 5625);
// productos.addProduct('Producto f', 'Descripción f', 545.99, 'thumbnail6.jpg', 'HIET456', 425);
// productos.addProduct('Producto g', 'Descripción g', 556.99, 'thumbnail7.jpg', 'FDT456', 125);
// productos.addProduct('Producto h', 'Descripción h', 553.99, 'thumbnail8.jpg', 'JET456', 3225);
// productos.addProduct('Producto i', 'Descripción i', 555.99, 'thumbnail9.jpg', 'GET456', 525);
// productos.addProduct('Producto j', 'Descripción j', 556.99, 'thumbnail10.jpg', 'REDST456', 425);
// productos.addProduct('Producto k', 'Descripción k', 505.99, 'thumbnail11.jpg', 'IET456', 325);


// productos.getProduct()

// productos.getProductById(1)

// productos.deleteProductById(2)

//  productos.UpdateProduct({
//     title: 'Producto c',
//     description: 'Descripción c',
//     price: 155.39,
//     thumbnail: 'thumbnailc.jpg',
//     code: 'RET567',
//     stock: 25,
//     id: 3
//  })



