const db = require("../../database/models");

const apiUsersController = {
  list: (req, res) => {

    db.User.findAll()
      .then((users) => {

        let dataUsers = [];

        users.forEach((element) => {

          dataUsers.push({

            id: element.dataValues.id,
            names: element.dataValues.names,
            email: element.dataValues.email,
            detail: `http://localhost:3000/api/users/${element.dataValues.id}`

          });
        });

        let response = {
          count: users.length,
          data: dataUsers
        };

        res.json(response);
      })
      .catch((error) => res.send(error));
  },
  detail: (req, res) => {

    db.User.findByPk(req.params.id)
      .then((user) => {

        let dataUser = {

          id: { id: user.dataValues.id },
          names: { names: user.dataValues.names },
          email: { email: user.dataValues.email },
          img: {url: `http://localhost:3000/img/profile/${user.dataValues.profile_img}`}

        };

        let response = {
          count: user.length,
          data: dataUser,
        };

        res.json(response);
      })
      .catch((error) => res.send(error));
  },
};

module.exports = apiUsersController;
