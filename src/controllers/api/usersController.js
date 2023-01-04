const db = require("../../database/models");

const apiUsersController = {
  redirect: (req, res) => {
    res.redirect("/api/users/page/1");
  },
  list: (req, res) => {
    let params = req.params.id;
    let limit = 10;
    let offset = (params - 1) * limit;

    db.User.findAll({
      limit: limit,
      offset: offset,
    })
      .then((users) => {
        let dataUsers = [];
        let links = "No more pages";

        users.forEach((element) => {
          dataUsers.push({
            id: element.dataValues.id,
            names: element.dataValues.names,
            email: element.dataValues.email,
            detail: `http://localhost:3001/api/users/${element.dataValues.id}`,
          });
        });

        if (params == 1 && users.length > 10) {
          links = {
            next: `http://localhost:3001/api/users/page/${
              Number(params) + Number(1)
            }`,
          };
        } else if (users.length / 10 > params) {
          links = {
            next: `http://localhost:3001/api/users/page/${
              Number(params) + Number(1)
            }`,
            previous: `http://localhost:3001/api/users/page/${
              Number(params) - Number(1)
            }`,
          };
        } else if (users.length > 10) {
          links = {
            previous: `http://localhost:3001/api/users/page/${
              Number(params) - Number(1)
            }`,
          };
        }

        let response = {
          count: users.length,
          users: dataUsers,
          pages: links,
        };

        res.json(response);
      })
      .catch((error) => res.send(error));
  },
  detail: (req, res) => {
    db.User.findByPk(req.params.id)
      .then((user) => {
        let page = Math.ceil(user.dataValues.id / 10);
        let dataUser = {
          id: user.dataValues.id,
          names: user.dataValues.names,
          email: user.dataValues.email,
          img: `http://localhost:3001/img/profile/${user.dataValues.profile_img}`,
          back: `http://localhost:3001/api/users/page/${page}`,
        };

        let response = {
          count: user.length,
          users: dataUser,
        };

        res.json(response);
      })
      .catch((error) => res.send(error));
  },
  allUsers: (req, res) => {
    db.User.findAll()
      .then((users) => {
        db.Order.findAll()
        .then((orders) => {

        let dataUsers = [];
        let dataOrders = []

          orders.forEach((element) => {
            dataOrders.push(element.dataValues.user_id)
          })
          
          const resultado = dataOrders.reduce(
            (prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev),
            {}
          );

        users.forEach((element) => {
          for (let key in resultado) {
            if (element.dataValues.id == key) {
          dataUsers.push({
            id: element.dataValues.id,
            names: element.dataValues.names,
            email: element.dataValues.email,
            orders: resultado[key],
            image:  `http://localhost:3001/img/profile/${element.dataValues.profile_img}`,
          
          });
          }
          }
        });

        dataUsers.sort(function (a, b) {
          if (a.orders > b.orders) {
            return -1;
          }
          if (a.orders < b.orders) {
            return 1;
          }
          return 0;
        });

        dataUsers.splice(3);

        let response = {
          users: dataUsers,
        };

        res.json(response);
      })
    })
      .catch((error) => res.send(error));
  },
};

module.exports = apiUsersController;
