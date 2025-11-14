"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Clock, User, MessageSquare, Users } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Student {
  name: string;
  matricula: string;
}

interface Task {
  id: string;
  students: Student[];
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  comments?: string;
}

interface TaskDetailDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskDetailDialog({
  task,
  open,
  onOpenChange,
}: TaskDetailDialogProps) {
  if (!task) return null;

  const dateDisplay =
    format(task.startDate, "d 'de' MMMM, yyyy", { locale: es }) ===
    format(task.endDate, "d 'de' MMMM, yyyy", { locale: es })
      ? format(task.startDate, "d 'de' MMMM, yyyy", { locale: es })
      : `${format(task.startDate, "d 'de' MMMM, yyyy", {
          locale: es,
        })} - ${format(task.endDate, "d 'de' MMMM, yyyy", { locale: es })}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {task.students.length > 1
              ? `Justificante Grupal - ${task.students.length} estudiantes`
              : task.students[0].name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-700">
              {task.students.length > 1 ? (
                <Users className="h-5 w-5" />
              ) : (
                <User className="h-5 w-5" />
              )}
              <h3 className="text-sm font-semibold">
                {task.students.length > 1 ? "Estudiantes" : "Estudiante"}
              </h3>
            </div>

            <div className="space-y-2 pl-7">
              {task.students.map((student, index) => (
                <div key={index} className="text-sm">
                  <p className="font-medium text-gray-900">{student.name}</p>
                  <p className="text-xs text-gray-500">
                    Matrícula: {student.matricula}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <Calendar className="h-5 w-5" />
            <div>
              <p className="text-xs text-gray-500">Fecha(s) a Justificar</p>
              <p className="text-sm font-medium">{dateDisplay}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-gray-600">
            <Clock className="h-5 w-5" />
            <div>
              <p className="text-xs text-gray-500">Horario</p>
              <p className="text-sm font-medium">
                {task.startTime} - {task.endTime}
              </p>
            </div>
          </div>

          {task.comments && (
            <div className="space-y-2 pt-2 border-t">
              <div className="flex items-center gap-2 text-gray-700">
                <MessageSquare className="h-4 w-4" />
                <h3 className="text-sm font-semibold">Comentarios</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed pl-6">
                {task.comments}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
