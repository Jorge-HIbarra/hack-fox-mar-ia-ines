import { NextResponse } from "next/server";
import { connectDB } from "./database";
import { Student } from "./student";
// import { Class } from "@/class";

// Utilidad para verificar traslape de horarios
function schedulesOverlap(justStart: number, justEnd: number, classStart: number, classEnd: number) {
  return justStart < classEnd && classStart < justEnd;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const { matricula, startDate, endDate, startTime, endTime } = await req.json();

    const student = await Student.findOne({ matricula }).populate("classes");

    if (!student) {
      return NextResponse.json(
        { ok: false, error: "La matrícula no existe." },
        { status: 404 }
      );
    }

    const justStart = new Date(`${startDate}T${startTime}`).getTime();
    const justEnd = new Date(`${endDate}T${endTime}`).getTime();

    const affected = [];

    for (const c of student.classes) {
      // Clases vienen con horario: { dia, hora }
      // Ejemplo hora: "10:00 - 12:00"
      const [hStart, hEnd] = c.horario.hora.split(" - ");

      // Aquí tomamos el mismo startDate para comparar únicamente horas.
      const classStart = new Date(`${startDate}T${hStart}`).getTime();
      const classEnd = new Date(`${startDate}T${hEnd}`).getTime();

      const overlap = schedulesOverlap(justStart, justEnd, classStart, classEnd);

      if (overlap) {
        affected.push({
          nombre: c.nombre,
          dia: c.horario.dia,
          horario: c.horario.hora,
          profesor: c.profesor,
          correo_profesor: c.correo_profesor,
          clave_materia: c.clave_materia
        });
      }
    }

    return NextResponse.json({
      ok: true,
      affectedClasses: affected,
      correosProfesores: affected.map(c => c.correo_profesor)
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { ok: false, error: "Error en servidor" },
      { status: 500 }
    );
  }
}
