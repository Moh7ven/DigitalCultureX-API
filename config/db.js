import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connexion à la MongoDB reussie!"))
    .catch(() => console.log("Connexion à MongoDB échouée"));
};

export default connectDB;
