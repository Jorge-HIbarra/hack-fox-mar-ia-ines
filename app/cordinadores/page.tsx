"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TaskCard } from "@/components/task-card";
import { AddTaskDialog } from "@/components/add-task-dialog";

interface Task {
  id: string;
  title: string;
  description?: string;
  date: Date;
  pillar: number;
}

const PILARES = [
  "Pilar 1",
  "Pilar 2",
  "Pilar 3",
  "Pilar 4",
  "Pilar 5",
  "Pilar 6",
  "Pilar 7",
];

export default function CoordinadoresPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPillar, setSelectedPillar] = useState<number | null>(null);

  const handleAddTask = (pillar: number) => {
    setSelectedPillar(pillar);
    setIsDialogOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, "id" | "pillar">) => {
    if (selectedPillar === null) return;

    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      pillar: selectedPillar,
    };

    setTasks([...tasks, newTask]);
    setIsDialogOpen(false);
    setSelectedPillar(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const getTasksForPillar = (pillarIndex: number) => {
    return tasks
      .filter((task) => task.pillar === pillarIndex)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-50 to-orange-50 p-6">
      <div className="mx-auto max-w-full">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Coordinadores</h1>
          <p className="text-gray-600 mt-2">Gestiona tus tareas por pilares</p>
        </header>

        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {PILARES.map((pilarName, index) => (
              <div key={index} className="flex flex-col gap-3 w-80">
                <Card className="bg-white/80 backdrop-blur shadow-md border-2">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-gray-800">
                        {pilarName}
                      </CardTitle>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        onClick={() => handleAddTask(index)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>

                <div className="flex flex-col gap-3">
                  {getTasksForPillar(index).map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onDelete={handleDeleteTask}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddTaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSaveTask}
      />
    </div>
  );
}
