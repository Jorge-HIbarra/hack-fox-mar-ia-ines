import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  nombre: String,
  horario: {
    dia: String,
    hora: String
  },
  profesor: String,
  correo_profesor: String,
  clave_materia: { type: String, unique: true },
  escuela: String,
  coordinador: String
});

export const Class = mongoose.model("Class", classSchema);
