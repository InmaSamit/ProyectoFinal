// src/app/components/create-task/create-task.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService, Task } from '../../services/interest/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Goal } from '../../services/interest/goal.service';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
})
export class CreateTaskComponent {
  @Input() goal!: Goal;
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  task: Task = { goal_id: this.goal?.id || 0, title: '', description: '', duration_minutes: 0 };

  constructor(private taskService: TaskService) {}

  createTask(): void {
    if(this.goal.id){
      this.task.goal_id = this.goal.id;
      this.taskService.createTask(this.task).subscribe(() => {
        this.created.emit();
        this.closeModal();
      });
    }
  }

  closeModal(): void {
    this.close.emit();
  }
}
