import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoalService, Goal } from '../../services/interest/goal.service';


@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-create-goal',
  templateUrl: './create-goal.component.html',
})
export class CreateGoalComponent {
  @Input() interestId!: number;
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  newGoal: Goal = { title: '', description: '', interest_id: 0 };

  constructor(private goalService: GoalService) {}

  ngOnChanges() {
    this.newGoal.interest_id = this.interestId;
  }

  closeModal() {
    this.close.emit();
  }

  createGoal() {
    this.goalService.createGoal(this.newGoal).subscribe(() => {
      this.closeModal();
      this.created.emit();
    });
  }
}
