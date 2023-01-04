const db = require("../../database/models");

const apiProductsController = {
  redirect: (req, res) => {
    res.redirect("/api/products/page/1");
  },
  list: (req, res) => {
    let params = req.params.id;
    let limit = 10;
    let offset = (params - 1) * limit;

    db.Product.findAll({
      limit: limit,
      offset: offset,
    })
      .then((products) => {
        let dataProducts = [];
        let links = "No more pages";

        products.forEach((element) => {
          dataProducts.push({
            id: element.dataValues.id,
            name: element.dataValues.name,
            description: element.dataValues.description,
            category: element.dataValues.category_id,
            detail: `http://localhost:3001/api/products/${element.dataValues.id}`,
          });
        });
        db.Product.findAll().then((allProducts) => {
          let pizza = 0;
          let queso = 0;
          let vegetal = 0;
          let carne = 0;
          let bebida = 0;
          let alcohol = 0;
          let postre = 0;

          allProducts.forEach((element) => {
            if (element.dataValues.category_id == 1) {
              pizza++;
            }
            if (element.dataValues.category_id == 2) {
              queso++;
            }
            if (element.dataValues.category_id == 3) {
              vegetal++;
            }
            if (element.dataValues.category_id == 4) {
              carne++;
            }
            if (element.dataValues.category_id == 5) {
              bebida++;
            }
            if (element.dataValues.category_id == 6) {
              alcohol++;
            }
            if (element.dataValues.category_id == 7) {
              postre++;
            }
          });

          let countByCategory = {
            pizzas_1: pizza,
            quesos_2: queso,
            vegetales_3: vegetal,
            carnes_4: carne,
            bebidas_5: bebida,
            alcoholes_6: alcohol,
            postres_7: postre,
          };
          if (params == 1 && allProducts.length > 10) {
            links = {
              next: `http://localhost:3001/api/products/page/${
                Number(params) + Number(1)
              }`,
            };
          } else if (allProducts.length / 10 > params) {
            links = {
              next: `http://localhost:3001/api/products/page/${
                Number(params) + Number(1)
              }`,
              previous: `http://localhost:3001/api/products/page/${
                Number(params) - Number(1)
              }`,
            };
          } else if (allProducts.length > 10) {
            links = {
              previous: `http://localhost:3001/api/products/page/${
                Number(params) - Number(1)
              }`,
            };
          }

          let response = {
            totalCount: allProducts.length,
            countByCategory: countByCategory,
            dataProducts: dataProducts,
            pages: links,
          };
          res.json(response);
        });
      })

      .catch((error) => res.send(error));
  },
  detail: (req, res) => {
    db.Product.findByPk(req.params.id)
      .then((product) => {
        let page = Math.ceil(product.dataValues.id / 10);
        let detailProduct = {
          id: product.dataValues.id,
          name: product.dataValues.name,
          price: product.dataValues.price,
          description: product.dataValues.description,
          db_relations: {
            category: product.dataValues.category_id,
            status: product.dataValues.status_id,
          },
          img: `http://localhost:3001/img/pizzas/${product.dataValues.image}`,
          back: `http://localhost:3001/api/products/page/${page}`,
        };

        let response = {
          detail: detailProduct,
        };

        res.json(response);
      })
      .catch((error) => res.send(error));
  },
  totalList: (req, res) => {
    db.Product.findAll()
      .then((products) => {
        let response = {
          products: products,
        };
        res.json(response);
      })
      .catch((error) => res.send(error));
  },
  sales: (req, res) => {
    db.Order.findAll().then((orders) => {
      // Total Ventas
      let countOrders = orders.length;

      // Products Sales

      db.Item.findAll().then((items) => {
        db.Extra.findAll().then((extras) => {
          db.Product.findAll().then((products) => {
            let totalProducts = [];
            let finalProducts = [];
            let topFive = [];

            extras.forEach((element) => {
              totalProducts.push(element.dataValues.product_id);
            });

            items.forEach((element) => {
              totalProducts.push(element.dataValues.product_id);
            });

            const resultado = totalProducts.reduce(
              (prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev),
              {}
            );

            products.forEach((element) => {
              for (let key in resultado) {
                if (element.dataValues.id == key) {
                  finalProducts.push({
                    id: element.dataValues.id,
                    name: element.dataValues.name,
                    image: element.dataValues.image,
                    price: element.dataValues.price,
                    category: element.dataValues.category_id,
                    status: element.dataValues.status_id,
                    value: resultado[key],
                  });
                  topFive.push({
                    name: element.dataValues.name,
                    image: element.dataValues.image,
                    category: element.dataValues.category_id,
                    value: resultado[key],
                  })
                }
              }
            });

            topFive.sort(function (a, b) {
              if (a.value > b.value) {
                return -1;
              }
              if (a.value < b.value) {
                return 1;
              }
              return 0;
            });
            
            topFive.splice(5)

            let response = {
              totalSales: countOrders,
              totalProducts: finalProducts,
              top5Products: topFive,
            };

            res.json(response);
          });
        });
      });
    });
  },
};

module.exports = apiProductsController;
