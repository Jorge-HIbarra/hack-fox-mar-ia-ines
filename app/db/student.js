import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  matricula: { type: String, unique: true },
  carrera: String,
  email: { type: String, unique: true },
  semestre: Number,
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }]
});

export const Student = mongoose.model("Student", studentSchema);
