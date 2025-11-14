'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Plus, X } from 'lucide-react'

interface Student {
  name: string
  matricula: string
}

interface AddTaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (task: { 
    students: Student[]
    startDate: Date
    endDate: Date
    startTime: string
    endTime: string
    comments?: string
  }) => void
}

export function AddTaskDialog({ open, onOpenChange, onSave }: AddTaskDialogProps) {
  const [students, setStudents] = useState<Student[]>([{ name: '', matricula: '' }])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [comments, setComments] = useState('')

  const updateStudent = (index: number, field: 'name' | 'matricula', value: string) => {
    const newStudents = [...students]
    if (field === 'matricula') {
      newStudents[index][field] = value.replace(/\D/g, '').slice(0, 5)
    } else {
      newStudents[index][field] = value
    }
    setStudents(newStudents)
  }

  const addStudent = () => {
    setStudents([...students, { name: '', matricula: '' }])
  }

  const removeStudent = (index: number) => {
    if (students.length > 1) {
      setStudents(students.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const validStudents = students.every(s => s.name && s.matricula.length === 5)
    if (!validStudents || !startDate || !endDate || !startTime || !endTime) return

    onSave({
      students,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      startTime,
      endTime,
      comments: comments || undefined,
    })

    setStudents([{ name: '', matricula: '' }])
    setStartDate('')
    setEndDate('')
    setStartTime('')
    setEndTime('')
    setComments('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Justificante</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            {students.map((student, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-lg p-4 relative">
                {students.length > 1 && (
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-destructive"
                    onClick={() => removeStudent(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
                
                <div className="grid gap-2">
                  <Label htmlFor={`studentName-${index}`}>
                    Nombre del Estudiante {students.length > 1 ? `#${index + 1}` : ''} *
                  </Label>
                  <Input
                    id={`studentName-${index}`}
                    placeholder="Nombre completo"
                    value={student.name}
                    onChange={(e) => updateStudent(index, 'name', e.target.value)}
                    required
                  />
                </div>
                
                <div className="grid gap-2 mt-3">
                  <Label htmlFor={`matricula-${index}`}>Matrícula (5 dígitos) *</Label>
                  <Input
                    id={`matricula-${index}`}
                    placeholder="00000"
                    value={student.matricula}
                    onChange={(e) => updateStudent(index, 'matricula', e.target.value)}
                    maxLength={5}
                    pattern="\d{5}"
                    required
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addStudent}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar otro estudiante
            </Button>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Fecha Inicial *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="endDate">Fecha Final *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startTime">Hora Inicial *</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="endTime">Hora Final *</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="comments">Comentarios</Label>
              <Textarea
                id="comments"
                placeholder="Motivo de la justificación (opcional)"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar Justificante</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
