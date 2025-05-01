// src/app/components/create-routine-task/create-routine-task.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InterestService } from '../../services/interest/interest.service';
import { GoalService } from '../../services/interest/goal.service';
import { TaskService } from '../../services/interest/task.service';
import { RoutineTaskService, RoutineTask } from '../../services/interest/routine-task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routine } from '../../services/interest/routine.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-create-routine-task',
  templateUrl: './create-routine-task.component.html',
})
export class CreateRoutineTaskComponent implements OnInit {
  @Input() routine!: Routine;
  @Input() day!: number;
  @Output() closeModal = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  interests: any[] = [];
  goals: any[] = [];
  tasks: any[] = [];

  selectedInterestId!: number;
  selectedGoalId!: number;
  selectedTaskId!: number;

  startTime: string = '';
  endTime: string = '';

  taskDuration = 0;

  days = [
    { value: 1, label: 'Lunes' },
    { value: 2, label: 'Martes' },
    { value: 3, label: 'Miércoles' },
    { value: 4, label: 'Jueves' },
    { value: 5, label: 'Viernes' },
    { value: 6, label: 'Sábado' },
    { value: 7, label: 'Domingo' },
  ];

  constructor(
    private interestService: InterestService,
    private goalService: GoalService,
    private taskService: TaskService,
    private routineTaskService: RoutineTaskService
  ) {}

  ngOnInit(): void {
    this.interestService.getInterests().subscribe(data => this.interests = data);
  }

  onInterestChange() {
    this.goals = [];
    this.tasks = [];
    this.goalService.getGoalsByInterest(this.selectedInterestId).subscribe(data => this.goals = data);
  }

  onGoalChange() {
    this.tasks = [];
    this.taskService.getTasksByGoal(this.selectedGoalId).subscribe(data => this.tasks = data);
  }

  onTaskChange() {
    const task = this.tasks.find(t => t.id === +this.selectedTaskId);
    this.taskDuration = task?.duration_minutes || 0;
    this.calculateEndTime();
  }

  calculateEndTime() {
    if (!this.startTime || !this.taskDuration) {
      this.endTime = '';
      return;
    }

    const [hours, minutes] = this.startTime.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + this.taskDuration;

    const endH = Math.floor(totalMinutes / 60) % 24;
    const endM = totalMinutes % 60;

    this.endTime = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
  }

  agendar() {
    const data: RoutineTask = {
      routine_id: this.routine?.id || 1,
      task_id: this.selectedTaskId,
      day_of_week: this.day,
      start_time: this.startTime,
      end_time: this.endTime
    };

    this.routineTaskService.create(data).subscribe(() => {
      this.created.emit();
      this.closeModal.emit();
    });
  }

  close() {
    this.closeModal.emit();
  }
}
