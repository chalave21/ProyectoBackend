/* 
Realizar una clase “ProductManager” que gestione un conjunto de productos.

Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.

Cada producto que gestione debe contar con las propiedades:
title (nombre del producto)
description (descripción del producto)
price (precio)
thumbnail (ruta de imagen)
code (código identificador)
stock (número de piezas disponibles)

Aspectos a incluir

Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
Validar que no se repita el campo “code” y que todos los campos sean obligatorios
Al agregarlo, debe crearse con un id autoincrementable
Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento

Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
En caso de no coincidir ningún id, mostrar en consola un error “Not found”


*/

class ProductManager{
    static idProduct = 1;
    constructor(){
        this.products = [];
    }

    addProduct(title,description,price,thumbnail,code,stock){

        
        if(this.products.some(p => p.code === code)){
            return console.log("No se puede repetir el mismo codigo");
             
        }
        if(!title || !description || !price || !thumbnail || !code || !stock){
            return console.log("Todos los campos son obligatorios.") 
        }
            let newProduct = {
                id: ProductManager.idProduct++,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock,
              };
              this.products.push(newProduct);
        
       
    }

    getProduct(){
        return this.products;
    }

    getProductById(productId){
        const product = this.products.find(p => p.id === productId);
        if(product){
            return product
        }else{
            return "Not found"
        }
    }

}

const producto1 = new ProductManager();
producto1.addProduct("a","b",100,"n","cv",100);
producto1.addProduct("a","b",100,"n","cj");
console.log(producto1.getProductById(2))
//console.log(producto1.getProduct());
/* const producto2 = new ProductManager();
producto2.addProduct("a","b",100,"n","cv",20);
producto2.addProduct("a","b",100,"n","cv",20);
console.log("PRODUCTO 2")
console.log(producto2.getProduct()); */