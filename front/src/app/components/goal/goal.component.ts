
import { CommonModule } from '@angular/common';
import {InterestService, Interest } from '../../services/interest/interest.service'
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Goal, GoalService} from '../../services/interest/goal.service'; 
import { CreateGoalComponent } from '../create-goal/create-goal.component'; 
import { ChangeDetectorRef } from '@angular/core';
import { EventEmitter, Output, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, CreateGoalComponent],
  selector: 'app-goal',
  templateUrl: './goal.component.html',
})
export class GoalComponent implements OnInit {
  interest: any = { title: '', description: '' };
  @Output() delete = new EventEmitter();
  @Output() goTask = new EventEmitter<Goal>(); 
  goals: Goal[] = [];
  showModal = false;
  newGoal: Goal = { title: '', description: '', interest_id: 0 };
  @Input() interestId!: number;  // Asegúrate de que esta propiedad está declarada como @Input()

  constructor(
    private route: ActivatedRoute,
    private goalService: GoalService,
    private interestService: InterestService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.loadInterest();
    });
  }

  loadInterest() {
    this.interestService.getInterestById(this.interestId).subscribe(data => {
      console.log('INTEREST', data);
      this.interest = { ...data };
      this.newGoal.interest_id = this.interestId;
      this.cdr.detectChanges();
      this.loadGoals();
    });
  }

  loadGoals() {
    this.goalService.getGoalsByInterest(this.interestId).subscribe(data => {
      this.goals = data;
      this.cdr.detectChanges();
    });
  }

  deleteGoal(goal: Goal) {
    if (goal.id != null) {
      this.goalService.deleteGoal(goal.id).subscribe(() => {
        this.loadGoals();
        this.delete.emit();
      });
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  
  goToDetail(goal: Goal): void {
    if (goal.id != null) {
    this.goTask.emit(goal); 
    }
  }


}
