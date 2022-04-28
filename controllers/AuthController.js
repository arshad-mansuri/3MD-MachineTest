const db = require("../models/db");
const bcrypt = require('bcryptjs');
const User = db.user;
const Op = db.Sequelize.Op;
// Create and Save a new Tutorial
exports.register = async (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Name can not be empty!"
      });
      return;
    }
    if (!req.body.username) {
        res.status(400).send({
          message: "Username can not be empty!"
        });
        return;
    }
    if (!req.body.password) {
        res.status(400).send({
          message: "Password can not be empty!"
        });
        return;
    }
    // Create a Tutorial
    const user = {
      name: req.body.name,
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, 10),
    };
    // Save Tutorial in the database
    User.create(user)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      });
};

exports.login = (req, res) => {
    try{
        if (!req.body.username) {
            res.status(400).send({
              message: "Username can not be empty!"
            });
            return;
        }
        if (!req.body.password) {
            res.status(400).send({
              message: "Password can not be empty!"
            });
            return;
        }
        const username = req.body.username;
        const password = req.body.password;
        User.findOne({
            where:{username:username}
        })
        .then(data => {
            if (data) {
                bcrypt.compare(password, data.password, function(err, result) {
                    if(result){
                        res.status(200).send({
                            message: "Sucessfully Login"
                        });
                    }
                    else{
                        res.status(400).send({
                            message: "Invalid Credentials"
                        });
                    }
                });
            } else {
                res.status(404).send({
                message: `Cannot find User`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with username=" + username
            });
        });
    }
    catch(e){
        console.log(e);
    }
};