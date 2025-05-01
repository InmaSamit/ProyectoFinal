// src/app/components/task/task.component.ts
import { Component, OnInit, Input,  EventEmitter, Output } from '@angular/core';
import { TaskService, Task } from '../../services/interest/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { Goal } from '../../services/interest/goal.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, CreateTaskComponent],
  selector: 'app-task',
  templateUrl: './task.component.html',
})
export class TaskComponent implements OnInit {
  @Input() goal!: Goal;
   @Output() delete = new EventEmitter();
  tasks: Task[] = [];
  showModal = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
      this.loadTasks();
  }

  loadTasks(): void {
    if (this.goal.id) {
      this.taskService.getTasksByGoal(this.goal.id).subscribe((data) => {
        this.tasks = data;
      });
    }
  }

  deleteTask(task: Task): void {
    if (task.id) {
      this.taskService.deleteTask(task.id).subscribe(() => {
        this.loadTasks(); // Refresh the tasks after deletion
        this.delete.emit();
      });
    }
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
