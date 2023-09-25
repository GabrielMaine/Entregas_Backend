//Definimos una clase Product para los elementos que cargamos al Product Manager
class Product {
    constructor(title, description, price, thumbnail, code, stock, id=0){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = id
    }
}

module.exports = Product;