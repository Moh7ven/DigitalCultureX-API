import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

let userSchema = mongoose.Schema({
  nom: {
    type: String,
    required: [true, "Veuillez entrez votre nom ! "],
  },
  prenom: {
    type: String,
    required: [true, "Veuillez entrer votre prenom !"],
  },
  email: {
    type: String,
    required: [true, "Veuillez entrer votre email !"],
    unique: "Cet email est déjà utilisé. Veuillez en choisir un autre.",
  },
  password: {
    type: String,
    required: [true, "Veuillez entrer votre mot de passe ! "],
  },
});
userSchema.plugin(uniqueValidator);

export default userSchema = mongoose.model("User", userSchema);
