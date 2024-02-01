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

    getProducts(){
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

/* TEST

Se creará una instancia de la clase “ProductManager”
Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
Se llamará al método “addProduct” con los campos:
title: “producto prueba”
description:”Este es un producto prueba”
price:200,
thumbnail:”Sin imagen”
code:”abc123”,
stock:25
El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo

*/

const producto1 = new ProductManager();
//console.log(producto1.getProducts());
producto1.addProduct("producto prueba",200,"Este es un producto prueba","Sin imagen","abc123",25);
//console.log(producto1.getProducts());
producto1.addProduct("producto prueba",200,"Este es un producto prueba","Sin imagen","abc123",25);
//console.log(producto1.getProductById(1));
console.log(producto1.getProductById(3));
