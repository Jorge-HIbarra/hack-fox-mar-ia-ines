"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Calendar, Clock, User, Users, Check, X } from "lucide-react";
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

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string) => void;
  onClick: (task: Task) => void;
  onAccept: (taskId: string) => void;
  onReject: (taskId: string) => void;
}

export function TaskCard({
  task,
  onDelete,
  onClick,
  onAccept,
  onReject,
}: TaskCardProps) {
  const dateDisplay =
    format(task.startDate, "d 'de' MMMM", { locale: es }) ===
    format(task.endDate, "d 'de' MMMM", { locale: es })
      ? format(task.startDate, "d 'de' MMMM, yyyy", { locale: es })
      : `${format(task.startDate, "d 'de' MMM", { locale: es })} - ${format(
          task.endDate,
          "d 'de' MMM, yyyy",
          { locale: es }
        )}`;

  const studentDisplay =
    task.students.length > 1
      ? `${task.students.length} estudiantes`
      : task.students[0].name;

  return (
    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow border-2 border-gray-300">
      <div onClick={() => onClick(task)} className="cursor-pointer">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium text-card-foreground leading-tight flex-1">
              {studentDisplay}
            </h3>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-muted flex-shrink-0"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-2 pt-0 pb-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {task.students.length > 1 ? (
              <Users className="h-3.5 w-3.5" />
            ) : (
              <User className="h-3.5 w-3.5" />
            )}
            <span>
              {task.students.length > 1
                ? `Grupo de ${task.students.length}`
                : `Mat: ${task.students[0].matricula}`}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>{dateDisplay}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>
              {task.startTime} - {task.endTime}
            </span>
          </div>
        </CardContent>
      </div>

      <CardContent className="pt-0 pb-3">
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            onClick={(e) => {
              e.stopPropagation();
              onAccept(task.id);
            }}
          >
            <Check className="h-4 w-4 mr-1" />
            Aceptar
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="flex-1 bg-red-600 hover:bg-red-700"
            onClick={(e) => {
              e.stopPropagation();
              onReject(task.id);
            }}
          >
            <X className="h-4 w-4 mr-1" />
            Rechazar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
