const path = require("path");
const db = require("../database/models");



const Products = db.Product;

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
  const que = await Products.findAll({ where: { category_id: "2" } }).then(
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
  const que = await Products.findAll({ where: { category_id: "3" } }).then(
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
  const que = await Products.findAll({ where: { category_id: "4" } }).then(
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
  let dataBebidasPedidas;
  const que = await Products.findAll({ where: { category_id: "5" } }).then(
    (dataBebidas) => {
      dataBebidas.forEach(function (bebidas) {
        if (extrasPedidos[bebidas.name] != 0) {
          let cantidad = { cantidad: extrasPedidos[bebidas.name] };
          Object.assign(bebidas, cantidad);
        }
      });
      dataBebidasPedidas = dataBebidas.filter((x) => x.cantidad > 0);
    }
  );
  return dataBebidasPedidas;
}

async function cantidadBebidas() {
  let cantidadBebidasPedidas = []
  let bebidasPedidas = await dataBebidasPedidas()
  bebidasPedidas.forEach(element => {
    cantidadBebidasPedidas.push(element.cantidad)
  });
  return cantidadBebidasPedidas
}

async function dataBebidasAlcoholicasPedidas() {
  let dataBebidasPedidas;
  await Products.findAll({ where: { category_id: "6" } }).then(
    (dataBebidas) => {
      dataBebidas.forEach(function (bebidas) {
        if (extrasPedidos[bebidas.name] != 0) {
          let cantidad = { cantidad: extrasPedidos[bebidas.name] };
          Object.assign(bebidas, cantidad);
        }
      });
      dataBebidasPedidas = dataBebidas.filter((x) => x.cantidad > 0);
    }
  );
  return dataBebidasPedidas;
}

async function cantidadAlcohol() {
  let cantidadAlcoholPedidas = []
  let alcoholPedidas = await dataBebidasAlcoholicasPedidas()
  alcoholPedidas.forEach(element => {
    cantidadAlcoholPedidas.push(element.cantidad)
  });
  return cantidadAlcoholPedidas
}

async function dataPostresPedidos() {
  let data = []

  const dataPostres = await Products.findAll({ where: { category_id: "7" } })
  dataPostres.forEach(element => {
    if (extrasPedidos[element.name] != 0) {
      data.push({
        item: element,
        qty: extrasPedidos[element.name]
      })
    }
  })
  return (data);
}


async function precioTotal(cart) {
  let precioSumado = 0
  cart.forEach((element) => {
    precioSumado = precioSumado + element.pizza.price
    if (element?.extras?.quesos?.length > 0) {
      precioSumado = precioSumado + element?.extras?.quesos?.length * element?.extras?.quesos[0]?.price
    }
    if (element?.extras?.vegetales?.length > 0) {
      precioSumado = precioSumado + element?.extras?.vegetales?.length * element?.extras?.vegetales[0]?.price
    }
    if (element?.extras?.proteinas?.length > 0) {
      precioSumado = precioSumado + element?.extras?.proteinas?.length * element?.extras?.proteinas[0]?.price
    }
    if (element?.bebidas?.gaseosas?.bebidasPedidas.length > 0) {
      (element?.bebidas?.gaseosas?.bebidasPedidas.forEach((bebida, index) => {
        precioSumado = precioSumado + bebida?.price * element?.bebidas?.gaseosas?.cantidadBebidasPedidas[index]
      }))
    }
    if (element?.bebidas?.cervezas?.alcoholPedidas.length > 0) {
      (element?.bebidas?.cervezas?.alcoholPedidas.forEach((cerveza, index) => {
        precioSumado = precioSumado + cerveza?.price * element?.bebidas?.cervezas?.cantidadAlcoholPedidas[index]
      }))
    }
    if (element?.postres?.length > 0) {
      (element?.postres?.forEach((postre, index) => {
        precioSumado = precioSumado + element?.postres[index].item.price * element?.postres[index].qty
      }))
    }
  })

  return precioSumado
}

const cartController = {
  cart: async (req, res) => {
    let totalPrecio = await precioTotal(req.session.cart)
    res.render("cart.ejs", { req: req.query, totalPrecio: totalPrecio });
  },

  addToCart: async (req, res) => {
    extrasPedidos = req.body;
    pizzaPedida = req.session.pizza;

    if (req.session.cart) {
      req.session.cart.push({
        pizza: await dataPizzaElegida(),
        extras: {
          quesos: await dataQuesosPedidos(),
          vegetales: await dataVegetalesPedidos(),
          proteinas: await dataCarnesPedidas(),
        },
        bebidas: {
          gaseosas: {
            bebidasPedidas: await dataBebidasPedidas(),
            cantidadBebidasPedidas: await cantidadBebidas(),
          },
          cervezas: {
            alcoholPedidas: await dataBebidasAlcoholicasPedidas(),
            cantidadAlcoholPedidas: await cantidadAlcohol(),
          },
        },
        postres: await dataPostresPedidos()
      });
    } else {
      req.session.cart = [
        {
          pizza: await dataPizzaElegida(),
          extras: {
            quesos: await dataQuesosPedidos(),
            vegetales: await dataVegetalesPedidos(),
            proteinas: await dataCarnesPedidas(),
          },
          bebidas: {
            gaseosas: {
              bebidasPedidas: await dataBebidasPedidas(),
              cantidadBebidasPedidas: await cantidadBebidas(),
            },
            cervezas: {
              alcoholPedidas: await dataBebidasAlcoholicasPedidas(),
              cantidadAlcoholPedidas: await cantidadAlcohol(),
            },
          },
          postres: await dataPostresPedidos()
        },
      ];
    }
    res.redirect("/cart");
  },

  removeItem: (req, res) => {
    delete req.session.cart[req.params.index];
    const remove = req.session.cart.filter((element) => {
      return element != null;
    });

    req.session.cart = remove;
    const item = "remove";

    res.redirect("/cart?item=" + item);
  },
};

module.exports = cartController;
