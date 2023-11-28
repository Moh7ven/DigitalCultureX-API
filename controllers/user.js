import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

//FONCTION POUR S'INCRIRE
export const signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: hash,
      });

      user
        .save()
        .then(() => {
          res.status(200).json({
            message: `Utilisateur ${req.body.nom} à été bien enregistré`,
          });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

//FONCTION POUR SE CONNECTER

export const login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ error: "Email ou Mot de passe incorrect !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ message: "Email ou Mot de passe incorrect !" });
          }
          res.status(200).json({
            // userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//FONCTION POUR RECUPÉRER TOUS LES UTILISATEURS
export const getAllUser = (req, res, next) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.json(400).json({ error }));
};

//FONCTION POUR RECUPÉRER LES INFOS DE L'UTILISTEUR CONNECTÉ
export const getUserConnected = (req, res) => {
  // console.log(req.auth.userId);
  User.findOne({ _id: req.auth.userId }).then((users) => {
    if (!users) {
      return res.status(401).json({ message: "Token invalide !" });
    }
    const { nom, prenom, email } = users;
    res.status(200).json({ nom, prenom, email });
  });
};

//FONCTION  POUR SUPPRIMER UN UTILISATEUR
export const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Utilisateur supprimé !" }))
    .catch((error) => res.status(401).json({ error }));
};
