import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

type StudentInput = {
  name: string
  matricula: string
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { task, status } = body as { task: any; status: string }

    // Configure transporter using environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined,
    })

    const results: Array<{ matricula: string; to: string; accepted: boolean; error?: string }> = []

    const students: StudentInput[] = task?.students || []

    for (const s of students) {
      try {
        // Use email provided in the task data if present, otherwise fall back to matricula-based address
        const to = (s as any).email || `cedric.martinez@cetys.edu.mx`

        const subject = status === 'accepted' ? 'Justificante Aceptado' : 'Justificante Rechazado'
        const text = `Hola ${s.name || ''},\n\nTu justificante con matrícula ${s.matricula} ha sido ${status === 'accepted' ? 'aceptado' : 'rechazado'} por el coordinador.\n\nSaludos,\nAdministración`

        await transporter.sendMail({
          from: process.env.FROM_EMAIL || process.env.SMTP_USER,
          to,
          subject,
          text,
        })

        results.push({ matricula: s.matricula, to, accepted: true })
      } catch (err: any) {
        results.push({ matricula: s.matricula, to: `cedric.martinez@cetys.edu.mx`, accepted: false, error: String(err.message || err) })
      }
    }

    return NextResponse.json({ ok: true, results })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: String(err.message || err) }, { status: 500 })
  }
}
