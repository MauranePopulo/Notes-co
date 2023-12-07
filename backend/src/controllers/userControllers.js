const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const models = require("../models");

const getUser = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postUser = (req, res) => {
  const { email, hashedPassword } = req.body;

  models.user
    .insert(email, hashedPassword)
    .then(([result]) => {
      console.info(result);
      res
        .status(200)
        .json({ Message: "Utilisateur crée avec succès", Email: email });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        Source: "controller",
        Erreur: "Erreur lors de l'enregistrement de l'utilisateur",
        Raison: err.sqlMessage,
      });
    });
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = {
          sub: req.user.id,
          email: req.user.email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.cookie("authToken", token);

        res.status(200).send("Connexion réussie");
      } else {
        res.sendStatus(401);
      }
    });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  console.info("ID DELETE: ", id);
  models.user.delete(id).then(([result]) => {
    if (result.affectedRows === 0) {
      res.status(404).send(result);
    } else {
      res.status(200).send("Compte supprimé avec succès");
    }
  });
};

module.exports = {
  getUser,
  postUser,
  verifyPassword,
  deleteUser,
};
