import express from "express";
import multer from "multer";
import {
  signup,
  login,
  getAllUser,
  getUserConnected,
  deleteUser,
} from "../controllers/user.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();
const upload = multer();

//ROUTE POUR S'INCRIRE
router.post("/signup", upload.any(), signup);

//ROUTE POUR SE CONNECTER
router.post("/login", upload.any(), login);

//ROUTE POUR RECUPÉRER TOUS LES UTILISATEURS INSCRITS
router.get("/allUser", getAllUser);

//ROUTE POUR RECUPÉRER L'UTILISATEUR CONNECTÉ
router.get("/userConnected", authUser, getUserConnected);

//ROUTE POUR SUPPRIMER UN UTILSATEUR
router.delete("/:id", deleteUser);

export default router;
