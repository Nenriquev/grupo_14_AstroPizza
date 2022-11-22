const path = require('path')
const fs = require("fs")

function findAllProducts(){
  const jsonData = fs.readFileSync(path.join(__dirname, "../data/products.json"))
  const data = JSON.parse(jsonData)
  return data
}


function dataQuesosPedidos(){
  data = findAllProducts();
  let dataQuesos = data.filter(x => x.category == "quesos");
  dataQuesos.forEach(function(quesos) {
    if(extrasPedidos[quesos.name] == "on"){
      let cantidad = { cantidad: 1};
      Object.assign(quesos, cantidad);
    }
  });
  dataQuesos = dataQuesos.filter(x => x.cantidad > 0);
  return dataQuesos
}

function dataCarnesPedidas(){
  data = findAllProducts();
  let dataCarnes = data.filter(x => x.category == "carnes");
  dataCarnes.forEach(function(carnes) {
    if(extrasPedidos[carnes.name] == "on"){
      let cantidad = { cantidad: 1};
      Object.assign(carnes, cantidad);
    }
  });
  dataCarnes = dataCarnes.filter(x => x.cantidad > 0);
  return dataCarnes
}

function dataVegetalesPedidos(){
  data = findAllProducts();
  let dataVegetales = data.filter(x => x.category == "vegetales");
  dataVegetales.forEach(function(vegetales) {
    if(extrasPedidos[vegetales.name] == "on"){
      let cantidad = { cantidad: 1};
      Object.assign(vegetales, cantidad);
    }
  });
  dataVegetales = dataVegetales.filter(x => x.cantidad > 0);
  return dataVegetales
}

function dataPostresPedidos(){
  data = findAllProducts();
  let dataPostres = data.filter(element => element.category == "Postres");
  dataPostres.forEach(function(postres) {
    if(extrasPedidos[postres.name] != 0){
      let cantidad = {cantidad: extrasPedidos[postres.name]}
      Object.assign(postres, cantidad);
    }
  });
  dataPostres = dataPostres.filter(x => x.cantidad > 0);
  return dataPostres
}


function dataBebidasPedidas(){
  data = findAllProducts();
  let dataBebidas = data.filter(x => x.category == "bebidas" || x.category == "cervezas");
  dataBebidas.forEach(function(bebidas) {
    if(extrasPedidos[bebidas.name] != 0){
      let cantidad = { cantidad: extrasPedidos[bebidas.name]};
      Object.assign(bebidas, cantidad);
    }
  });
  dataBebidas = dataBebidas.filter(x => x.cantidad > 0);
  return dataBebidas
}


function dataPizzaElegida(){
  data = findAllProducts();
  let dataPizza = data.filter(x => x.category == "Pizzas");
  let found
  dataPizza.forEach(function(pizzas) {
    found = dataPizza.find(element => element.value == pizzaPedida);
  });
  return found;
}




const cartController = {
  
  cart: (req, res) => {
    
    
    extrasPedidos = req.body;
    pizzaPedida = req.session.pizza
    pizzaElegida = dataPizzaElegida();
    dataQuesos = dataQuesosPedidos();
    dataCarnes = dataCarnesPedidas();
    dataVegetales = dataVegetalesPedidos();
    dataBebidas = dataBebidasPedidas();
    dataPostres = dataPostresPedidos()

    
    res.render('cart.ejs', {pizzaElegida: pizzaElegida,
                            dataQuesos: dataQuesos, 
                            dataCarnes: dataCarnes,
                            dataVegetales: dataVegetales,
                            dataBebidas: dataBebidas,
                            dataPostres: dataPostres,
                            });
  }

}

module.exports = cartController;