//Comando npm run dev para ejecutar con nodemon

//Importamos express y la clase ProductManager
const express = require('express')
const ProductManager = require('./ProductManager')


const app = express()
app.use(express.urlencoded({extended:true}))

//Creamos una variable product vinculada al archivo Productos.json
let product = new ProductManager('./src/Productos.json');

app.get('/products',async(req,res) => {
    let limit = req.query.limit;
    let products = await product.getProducts()
    let filteredProducts = []
    
    if(!limit||limit<0||isNaN(limit)){
        //Si no existe el query, si el limite es negativo o si no es un numero devolvemos todos los productos
        res.send(products)
    }else{
        //Si hay un query valido devolvemos tantos productos como sea posible hasta alcanzar el limite o que no haya mas productos
        for(let i=0; i<limit; i++){
            if (products[i]){
                filteredProducts.push(products[i])
            }
        }
        res.send(filteredProducts)
    }
})

app.get('/products/:pid',async (req,res) =>{
    let pId = req.params.pid
    let filteredProduct = await product.getProductById(parseFloat(pId))
    //Si el resultado de la busqueda es un objeto vacio mostramos un mensaje, si no mostramos el objeto
    if(Object.keys(filteredProduct).length===0){
        res.send("No existe un producto con ese ID")
    }else{
        res.send(filteredProduct)
    }
})

//Abrimos el servidor en el puerto 8080
app.listen(8080, ()=>console.log("Servidor en el puerto 8080"))

//Dejamos comentado el codigo para cargar el archivo Productos.json en caso de ser necesario
// const Product = require('./Product')
// product.addProduct(new Product ("Coca Cola", "Coca cola de 1l", 1000, "url", 5344, 1000))
// product.addProduct(new Product ("Quilmes", "Quilmes de 1l", 1300, "url", 5345, 1000))
// product.addProduct(new Product ("Heineken", "Heineken de 1l", 1600, "url", 5346, 1000))
// product.addProduct(new Product ("Pepsi", "Pepsi de 1l", 1000, "url", 5347, 1000))
// product.addProduct(new Product ("Manaos", "Manaos de 1l", 800, "url", 5348, 1000))
// product.addProduct(new Product ("Baggio", "Baggio de 1l", 1000, "url", 5349, 1000))
// product.addProduct(new Product ("Doritos", "Paquete de Doritos", 1300, "url", 5350, 1000))
// product.addProduct(new Product ("Lays Clasicas", "Paquete de Lays Clasicas", 1200, "url", 5351, 1000))
// product.addProduct(new Product ("Mani", "Bolsa de mani con cascara", 1000, "url", 5352, 1000))
// product.addProduct(new Product ("Mani saborizado", "Bolsa de mani saborizado", 1000, "url", 5353, 1000))