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
            detail: `http://localhost:3001/api/users/${element.dataValues.id}`

          });
        });

        let response = {
          count: users.length,
          users: dataUsers
        };

        res.json(response);
      })
      .catch((error) => res.send(error));
  },
  detail: (req, res) => {

    db.User.findByPk(req.params.id)
      .then((user) => {

        let dataUser = {

          id: user.dataValues.id,
          names: user.dataValues.names,
          email: user.dataValues.email,
          img: `http://localhost:3001/img/profile/${user.dataValues.profile_img}`

        };

        let response = {
          count: user.length,
          users: dataUser,
        };

        res.json(response);
      })
      .catch((error) => res.send(error));
  },
};

module.exports = apiUsersController;
