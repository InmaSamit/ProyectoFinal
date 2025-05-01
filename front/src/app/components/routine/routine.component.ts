// src/app/components/routine/routine.component.ts
import { Component, OnInit } from '@angular/core';
import { RoutineService, Routine } from '../../services/interest/routine.service';
import { RoutineTaskService, RoutineTask } from '../../services/interest/routine-task.service';
import { TaskService, Task } from '../../services/interest/task.service';
import { WeekCalendarComponent } from '../week-calendar/week-calendar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateRoutineComponent } from '../create-routine/create-routine.component';

@Component({
  selector: 'app-routine',
  standalone: true,
  imports: [WeekCalendarComponent, CommonModule, FormsModule,CreateRoutineComponent],
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.css']
})
export class RoutineComponent implements OnInit {
  routines: Routine[] = [];
  expandedRoutineId: number | null = null;
  routineTasksMap: { [routineId: number]: RoutineTask[] } = {};
  showCreateModal = false;
  weekdays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  constructor(
    private routineService: RoutineService,
    private routineTaskService: RoutineTaskService
  ) {}

  ngOnInit(): void {
    this.loadRoutines();
  }

  loadRoutines(): void {
    this.routineService.getByUser().subscribe(routines => {
      this.routines = routines;
    });
  }
  deleteRoutine(routine: Routine): void {
    this.routineService.delete(routine?.id || 0).subscribe({
      next: () => this.loadRoutines(),
      error: err => console.error('Error eliminando rutina', err)
    });
  }

  openModal() {
    this.showCreateModal = true;
  }

  closeModal() {
    this.showCreateModal = false;
  }

  created() {
    this.closeModal();
    this.loadRoutines();
  }
}
