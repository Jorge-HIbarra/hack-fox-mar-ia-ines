import { NextResponse } from "next/server";
import { connectDB } from "../../../db/database";
import { Student } from "../../../db/student";
// import { Class } from "@/models/class";

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    const { name, matricula, startDate, endDate, startTime, endTime } = data;

    // 1️⃣ BUSCAR AL ALUMNO
    const student = await Student.findOne({ matricula }).populate("classes");

    if (!student) {
      return NextResponse.json(
        { error: "No existe un estudiante con esa matrícula." },
        { status: 404 }
      );
    }

    // 2️⃣ SI EL NOMBRE NO COINCIDE ➜ CORREGIRLO
    let correctedName = student.name;
    const nameMatches = student.name.toLowerCase() === name.toLowerCase();

    // 3️⃣ PROCESO DE HORAS
    const justifyStart = new Date(`${startDate}T${startTime}`);
    const justifyEnd = new Date(`${endDate}T${endTime}`);

    // 4️⃣ BUSCAR CLASES AFECTADAS
    const affectedClasses = [];

    for (const cls of student.classes) {
      const [horaInicio, horaFin] = cls.horario.hora.split(" - ");

      const classStart = new Date(`${startDate}T${horaInicio}`);
      const classEnd = new Date(`${startDate}T${horaFin}`);

      const overlaps =
        (classStart <= justifyEnd) && (classEnd >= justifyStart);

      if (overlaps) {
        affectedClasses.push({
          nombre: cls.nombre,
          profesor: cls.profesor,
          correo_profesor: cls.correo_profesor,
          horario: cls.horario,
        });
      }
    }

    return NextResponse.json({
      correctedName,
      nameMatches,
      affectedClasses,
    });
  } catch (error) {
    console.error("Error validando justificante:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
