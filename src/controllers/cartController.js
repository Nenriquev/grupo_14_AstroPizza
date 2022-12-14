const db = require("../database/models");

const Products = db.Product;
const Order = db.Order


async function dataPizzaElegida() {
  let pizzaElegida;
  await Products.findAll({ where: { category_id: "1" } }).then((pizza) => {
    for (let i = 0; i < pizza.length; i++) {
      if (pizzaPedida == pizza[i].name) {
        pizzaElegida = pizza[i];
      }
    }
  });
  return pizzaElegida;
}

async function dataQuesosPedidos() {
  let quesitos = [];
  await Products.findAll({ where: { category_id: "2" } }).then(
    (queso) => {
      for (let i = 0; i < queso.length; i++) {
        if (extrasPedidos[queso[i].name] == "on") {
          quesitos.push(queso[i]);
        }
      }
    }
  );
  return quesitos;
}

async function dataVegetalesPedidos() {
  let vegetalesElegidos = [];
  await Products.findAll({ where: { category_id: "3" } }).then(
    (vegetal) => {
      for (let i = 0; i < vegetal.length; i++) {
        if (extrasPedidos[vegetal[i].name] == "on") {
          vegetalesElegidos.push(vegetal[i]);
        }
      }
    }
  );
  return vegetalesElegidos;
}

async function dataCarnesPedidas() {
  let carneElegida = [];
  await Products.findAll({ where: { category_id: "4" } }).then(
    (carne) => {
      for (let i = 0; i < carne.length; i++) {
        if (extrasPedidos[carne[i].name] == "on") {
          carneElegida.push(carne[i]);
        }
      }
    }
  );
  return carneElegida;
}

async function dataBebidasPedidas() {
  let data = []

  const dataGaseosas = await Products.findAll({ where: { category_id: "5" } })
  dataGaseosas.forEach(element => {
    if(extrasPedidos[element.name] != 0){
      data.push({
        item: element,
        qty: Number(extrasPedidos[element.name]),
      })
    }
  })
  
  return (data);
}

async function dataBebidasAlcoholicasPedidas() {
  let data = []

  const dataCervezas = await Products.findAll({ where: { category_id: "6" } })
  dataCervezas.forEach(element => {
    if(extrasPedidos[element.name] != 0){
      data.push({
        item: element,
        qty: Number(extrasPedidos[element.name]),
      })
    }
  })
  
  return (data);
}

async function dataPostresPedidos() {
  let data = []

  const dataPostres = await Products.findAll({ where: { category_id: "7" } })
  dataPostres.forEach(element => {
    if (extrasPedidos[element.name] != 0) {
      data.push({
        item: element,
        qty: Number(extrasPedidos[element.name]),
      })
    }
  })
  
  return (data);
}


const totalCountExtras = (element) => {
  let count = 0
  let total = 0
  element.forEach(item => {
    count++
    total = total + item.price
  })
  return({items: count, totalAmount: total})
}

async function calculateItems(data) {
  let totalItems = 0
  let totalAmount = 0

  if(data){
  const sessionCart = await data
   sessionCart.forEach(element => {
    let subtotal = 0
      if(element.pizza){
        totalItems++
        subtotal = subtotal + element.pizza.price
      }
      if(element.extras.quesos.length > 0){
        let extra = totalCountExtras(element.extras.quesos)
        totalItems = totalItems + extra.items
        subtotal = subtotal + extra.totalAmount
      }
      if(element.extras.vegetales.length > 0){
        let extra = totalCountExtras(element.extras.vegetales)
        totalItems = totalItems + extra.items
        subtotal = subtotal + extra.totalAmount
      }
      if(element.extras.proteinas.length > 0){
        let extra = totalCountExtras(element.extras.proteinas)
        totalItems = totalItems + extra.items
        subtotal = subtotal + extra.totalAmount
      }

      if(element.bebidas.gaseosas.length > 0){
        const gaseosas = element.bebidas.gaseosas
        gaseosas.forEach(gaseosa => {
          totalItems = totalItems + gaseosa.qty
          subtotal = subtotal + (gaseosa.qty * gaseosa.item.price)
        })
      }

      if(element.bebidas.cervezas.length > 0){
        const cervezas = element.bebidas.cervezas
        cervezas.forEach(cerveza => {
          totalItems = totalItems + cerveza.qty
          subtotal = subtotal + (cerveza.qty * cerveza.item.price)
        })
      }

      if(element.postres.length > 0){
        const postres = element.postres
        postres.forEach(postre => {
          totalItems = totalItems + postre.qty
          subtotal = subtotal + (postre.qty * postre.item.price)
        })
      }
  
      element.subtotal = (subtotal * Number(element.qty))
      totalAmount = totalAmount + (subtotal * Number(element.qty))
})

  return({totalItems: totalItems, totalAmount: totalAmount})
}}

const cartController = {
  cart: async (req, res) => {

    let total = 0
    if(req.session.cart){
      const cart = req.session.cart
      total = await calculateItems(cart)
    }
    res.render("cart.ejs", {param: req.query, total: total});
  },

  addToCart: async (req, res) => {
    extrasPedidos = req.body;
    pizzaPedida = req.session.pizza;

    
    if(req.session.cart) {
      req.session.cart.push({
        pizza: await dataPizzaElegida(),
        qty: extrasPedidos.quantity,
        extras: {
          quesos: await dataQuesosPedidos(),
          vegetales: await dataVegetalesPedidos(),
          proteinas: await dataCarnesPedidas(),
        },
        bebidas: {
          gaseosas: await dataBebidasPedidas(),
          cervezas: await dataBebidasAlcoholicasPedidas(),
        },
        postres: await dataPostresPedidos(),
        subtotal: null
      });
    } else {
      req.session.cart = [
        {
          pizza: await dataPizzaElegida(),
          qty: extrasPedidos.quantity,
          extras: {
            quesos: await dataQuesosPedidos(),
            vegetales: await dataVegetalesPedidos(),
            proteinas: await dataCarnesPedidas(),
          },
          bebidas: {
            gaseosas: await dataBebidasPedidas(),
            cervezas: await dataBebidasAlcoholicasPedidas(),
            },
          postres: await dataPostresPedidos(),
          subtotal: null
        },
      ];
    }
     await calculateItems(req.session.cart)

    res.redirect("/cart");
  },

  removeItem: (req, res) => {
    delete req.session.cart[req.params.index];
    const remove = req.session.cart.filter((element) => {
      return element != null;
    });

    req.session.cart = remove;
    const item = "remove";
    calculateItems(req.session.cart)

    res.redirect("/cart?item=" + item);
  },

  storeCart: async (req, res) => {

    const cart = req.session.cart
    const items = []
    const extras = []
    const totalCount = await calculateItems(cart)


    if(req.session.cart && req?.session?.cart?.length > 0){

    cart.forEach((element) => {
     
      if(element.pizza){
        if(element.extras.quesos.length > 0){
            const quesos = element.extras.quesos;
            quesos.forEach(queso => {
                extras.push({
                  product_id: queso.id
                })
            })
        }

        if(element.extras.vegetales.length > 0){
          const vegetales = element.extras.vegetales;
          vegetales.forEach(vegetal => {
              extras.push({
                product_id: vegetal.id
              })
          })
        }

        if(element.extras.proteinas.length > 0){
          const proteinas = element.extras.proteinas;
          proteinas.forEach(proteina => {
              extras.push({
                product_id: proteina.id
              })
          })
        }
        items.push({
          product_id: element.pizza.id,
          quantity: element.qty,
          price: element.pizza.price,
          Extra: extras,
        })
      }

      if(element.bebidas.gaseosas.length > 0){
        const gaseosas = element.bebidas.gaseosas;
        gaseosas.forEach(gaseosa => {
          items.push({
            product_id: gaseosa.item.id,
            quantity: gaseosa.qty,
            price: gaseosa.item.price,
          })
        })
      }

      if(element.bebidas.cervezas.length > 0){
        const cervezas = element.bebidas.cervezas
        cervezas.forEach(cerveza => {
          items.push({
            product_id: cerveza.item.id,
            quantity: cerveza.qty,
            price: cerveza.item.price,
          }) 
        })
        
      }

      if(element.postres.length > 0){
        const postres = element.postres;
        postres.forEach(postre => {
          items.push({
            product_id: postre.item.id,
            quantity: postre.qty,
            price: postre.item.price,
          }) 
        })
        
      }
    })
 
          const order = await Order.create(
        {
          user_id: res.locals.user.id,
          payMethod: req.body.payment_mode ? 'tarjeta' : 'efectivo',
          total_items: totalCount.totalItems,
          total: totalCount.totalAmount + 120,
          Item: items,
        },
        {
          include: [
            {
              association: "Item",
              include: ["Extra"],
            },
          ],
        }
      );    

      delete req.session.cart
      res.redirect(`/users/orders/${order.id}?order=success`)   
    }
    else{
      res.redirect('/product')
    }
  },

};

module.exports = cartController;
