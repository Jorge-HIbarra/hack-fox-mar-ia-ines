import { connectDB } from "./database.js";
import { Student } from "./student.js";
import { Class } from "./class.js";

async function start() {
  await connectDB();

  const clase = await Class.create({
    nombre: "Calculo 1",
    horario: { dia: "Lunes y Miercoles", hora: "10:00 - 12:00" },
    profesor: "Dr. Hernández",
    correo_profesor: "hernandez@uni.mx",
    clave_materia: "MAT101",
    escuela: "Ingeniería",
    coordinador: "Ing. Morales"
  });

  console.log("Clase creada:", clase);

  const student = await Student.create({
    name: "Carlos Martínez",
    matricula: "A01020304",
    carrera: "Ingeniería Mecánica",
    email: "carlos@uni.mx",
    semestre: 3,
    classes: [clase._id]
  });

  console.log("Estudiante creado:", student);

  process.exit(0);
}

start();
