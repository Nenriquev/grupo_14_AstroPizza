const path = require('path')
const fs = require("fs")
const db = require('../database/models');

const Products = db.Product

async function dataPizzaElegida(){
  let pizzaElegida
  const que = await Products.findAll({where:{category_id: '1'}})
    .then( (pizza) => {
      for(let i = 0; i < pizza.length ; i++){
        if(pizzaPedida == pizza[i].name){
            pizzaElegida = pizza[i]
        }
      }
    }) 
  return pizzaElegida;
}

async function dataQuesosPedidos(){
 let quesitos = [];
  const que = await Products.findAll({where:{category_id: '2'}})
    .then( (queso) => {
      for(let i = 0; i < queso.length ; i++){
        if(extrasPedidos[queso[i].name] == "on"){
          quesitos.push(queso[i])
        }
      }
    })
  return quesitos
}

async function dataVegetalesPedidos(){
  let vegetalesElegidos = [];
    const que = await Products.findAll({where:{category_id: '3'}})
      .then( (vegetal) => {
        for(let i = 0; i < vegetal.length ; i++){
          if(extrasPedidos[vegetal[i].name] == "on"){
            vegetalesElegidos.push(vegetal[i])
          }
        }
      })
 return vegetalesElegidos
}

async function dataCarnesPedidas(){
  let carneElegida = [];
    const que = await Products.findAll({where:{category_id: '4'}})
      .then((carne) => {
        for(let i = 0; i < carne.length ; i++){
          if(extrasPedidos[carne[i].name] == "on"){
            carneElegida.push(carne[i])
          }
        }
      })
 return carneElegida
}

async function dataBebidasPedidas(){
  let dataBebidasPedidas
  const que = await Products.findAll({where:{category_id: '5'}})
    .then( (dataBebidas) => {
      dataBebidas.forEach(function(bebidas) {
        if(extrasPedidos[bebidas.name] != 0){
          let cantidad = { cantidad: extrasPedidos[bebidas.name]};
          Object.assign(bebidas, cantidad);
        }
      
    });
  dataBebidasPedidas = dataBebidas.filter(x => x.cantidad > 0);
  });
  return dataBebidasPedidas
}

async function dataBebidasAlcoholicasPedidas(){
  let dataBebidasPedidas
  const que = await Products.findAll({where:{category_id: '6'}})
  .then((dataBebidas) => {
    dataBebidas.forEach(function(bebidas) {
      if(extrasPedidos[bebidas.name] != 0){
        let cantidad = { cantidad: extrasPedidos[bebidas.name]};
        Object.assign(bebidas, cantidad);
      }
    
    });
  dataBebidasPedidas = dataBebidas.filter(x => x.cantidad > 0);
  });
  return dataBebidasPedidas
}

async function dataPostresPedidos(){
  let dataPostresPedidas
  const que = await Products.findAll({where:{category_id: '7'}})
  .then((dataPostres) => {
    dataPostres.forEach(function(postres) {
      if(extrasPedidos[postres.name] != 0){
        let cantidad = { cantidad: extrasPedidos[postres.name]};
        Object.assign(postres, cantidad);
      }
    
    });
    dataPostresPedidas = dataPostres.filter(x => x.cantidad > 0);
  });
  return dataPostresPedidas
}

function precioTotal(element) {
  let total = element[0].price
  for (let i = 1; i < element.length; i++) {
    for (let j = 0; j < element[i].length; j++) {
      if (i == 4 || i == 5 || i == 6) {
       precioCantidad = element[i][j].price * element[i][j].cantidad
       total = total + precioCantidad
      }else{
        total = total + element[i][j].price
      }
    }
  }
  return total;
}

const cartController = {
  
  cart: (req, res) => {
    extrasPedidos = req.body;
    pizzaPedida = req.session.pizza;
    Promise.all([dataPizzaElegida(), dataQuesosPedidos(), dataCarnesPedidas(), dataVegetalesPedidos(), dataBebidasPedidas(), dataBebidasAlcoholicasPedidas(), dataPostresPedidos()]).then((element)=>{
      precioSumado = precioTotal(element)
      res.render('cart.ejs', {pizzaElegida: element[0],
                              quesosPedidos: element[1], 
                              carnesPedidas: element[2],
                              vegetalesPedidos: element[3],
                              bebidasPedidas: element[4],
                              bebidasAlcoholicasPedidas: element[5],
                              postresPedidos: element[6],
                              precioSumado: precioSumado
                              });
    })
  }
}

module.exports = cartController;