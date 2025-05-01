import { Component, OnInit } from '@angular/core';
import { Task } from '../../services/interest/task.service';
import { RoutineTask, RoutineTaskService } from '../../services/interest/routine-task.service';
import { EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Routine } from '../../services/interest/routine.service';
import { CreateRoutineTaskComponent } from '../create-routine-task/create-routine-task.component';

@Component({
  selector: 'app-week-calendar',
  standalone: true,
  imports: [FormsModule, CommonModule, CreateRoutineTaskComponent],
  templateUrl: './week-calendar.component.html',
  styleUrl: './week-calendar.component.css'
})
export class WeekCalendarComponent implements OnInit {
  @Input() routine!: Routine;
  allTasks: Task[] = [];
  showTaskModal = false;
  currentDay! : number;
   daysOfWeek = [
    { value: 'Monday', num: 1 },
    { value: 'Tuesday', num: 2 },
    { value: 'Wednesday', num: 3 },
    { value: 'Thursday', num: 4 },
    { value: 'Friday', num: 5 },
    { value: 'Saturday', num: 6 },
    { value: 'Sunday', num: 7 }];//['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  assignedTasks: RoutineTask[] = [];
  

    constructor(private routineTaskService: RoutineTaskService) {}
  ngOnInit() {
    this.loadRoutineTasks();
  }
  
  loadRoutineTasks() {
    if(this.routine && this.routine.id) {
      this.routineTaskService.getByRoutine(this.routine.id).subscribe(data => {
        console.log("escuchandpoo" + JSON.stringify(data));
        this.assignedTasks = data;
      });
    }
  }
  
  getTasksForDay(day: string) {
    return this.assignedTasks.filter(t => {
      return t.day_of_week.toString() === day;
    });
  }
  
  addTask(day: number) {
    this.currentDay = day;
    this.showTaskModal = true;
  }  
  deleteTask(routine: RoutineTask) {
    if(routine.id)
    this.routineTaskService.delete(routine.id).subscribe(() => {
      this.loadRoutineTasks();
    });
  }
}
