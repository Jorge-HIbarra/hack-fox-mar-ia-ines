'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { TaskCard } from '@/components/task-card'
import { AddTaskDialog } from '@/components/add-task-dialog'
import { TaskDetailDialog } from '@/components/task-detail-dialog'
import Image from 'next/image'

interface Student {
  name: string
  matricula: string
}

interface Task {
  id: string
  students: Student[]
  startDate: Date
  endDate: Date
  startTime: string
  endTime: string
  comments?: string
  pillar: number
  status?: 'pending' | 'accepted' | 'rejected'
}

const PILARES = [
  'Pilar 1',
  'Pilar 2', 
  'Pilar 3',
  'Pilar 4',
  'Pilar 5',
  'Pilar 6',
  'Pilar 7'
]

export default function CoordinadoresPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPillar, setSelectedPillar] = useState<number | null>(null)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  const handleAddTask = (pillar: number) => {
    setSelectedPillar(pillar)
    setIsDialogOpen(true)
  }

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'pillar'>) => {
    if (selectedPillar === null) return
    
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      pillar: selectedPillar,
    }
    
    setTasks([...tasks, newTask])
    setIsDialogOpen(false)
    setSelectedPillar(null)
  }

  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const handleAcceptTask = (taskId: string) => {
    console.log('Justificante aceptado:', taskId)
    // Aquí puedes agregar lógica adicional para marcar como aceptado
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: 'accepted' } : task))
  }

  const handleRejectTask = (taskId: string) => {
    console.log('Justificante rechazado:', taskId)
    // Aquí puedes agregar lógica adicional para marcar como rechazado
    setTasks(tasks.map(task => task.id === taskId ? { ...task, status: 'rejected' } : task))
  }

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    setIsDetailDialogOpen(true)
  }

  const getTasksForPillar = (pillarIndex: number) => {
    return tasks
      .filter(task => task.pillar === pillarIndex)
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="sticky top-0 z-10 bg-background border-b border-border shadow-sm">
        <div className="max-w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Coordinadores</h1>
              <p className="text-muted-foreground mt-1">Gestiona justificaciones de faltas por pilares</p>
            </div>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-K6XXqqKDjSG7jVCllo0GHbEaAisl08.png"
              alt="CETYS Universidad"
              width={140}
              height={140}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max">
            {PILARES.map((pilarName, index) => (
              <div key={index} className="flex flex-col gap-3 w-80">
                <Card className="bg-primary backdrop-blur shadow-lg border-2 border-foreground">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold text-primary-foreground">
                        {pilarName}
                      </CardTitle>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-primary-foreground hover:text-primary-foreground hover:bg-black/10"
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
                      onClick={handleTaskClick}
                      onAccept={handleAcceptTask}
                      onReject={handleRejectTask}
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

      <TaskDetailDialog
        task={selectedTask}
        open={isDetailDialogOpen}
        onOpenChange={setIsDetailDialogOpen}
      />
    </div>
  )
}
