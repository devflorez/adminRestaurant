import mongoose from "mongoose";

const PlatoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre del plato es obligatorio"],
    },
    precio: {
        type: Number,
        required:[ true, "El precio del plato es obligatorio"],
    },
    ingredientes: {
        type: String,
        required: [true, "Los ingredientes del plato son obligatorios"],
    },
    imagen: {
        type: String,
        required:[ true, "La imagen del plato es obligatoria"],
    },
});

export default mongoose.models.Plato || mongoose.model("Plato", PlatoSchema);