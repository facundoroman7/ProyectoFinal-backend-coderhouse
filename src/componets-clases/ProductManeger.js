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
