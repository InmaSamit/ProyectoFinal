import { Component, inject ,ViewChild} from '@angular/core';
import { InterestsComponent } from '../interest/interest.component';
import { GoalComponent } from '../goal/goal.component';
import { TaskComponent } from '../task/task.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutineComponent } from '../routine/routine.component';
import { Router } from '@angular/router';
import { Goal } from '../../services/interest/goal.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [InterestsComponent, GoalComponent, TaskComponent, CommonModule, RoutineComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  showInterest = true;  // Variable para controlar la tarjeta de intereses
  showGoal = false;     // Variable para controlar la tarjeta de objetivos
  showTask = false;
  currentInterestId!: number; // Variable para guardar el ID del interés actual
  currentGoal!: Goal;
  router = inject(Router);
  @ViewChild(RoutineComponent) rutinas!: RoutineComponent;
  // Método que es llamado cuando el evento goGoals es disparado desde app-interests
  showGoalComponent(interestId: number) {
    this.currentInterestId = interestId;  // Guardamos el ID del interés
    this.showInterest = false;  // Ocultar la tarjeta de intereses
    this.showGoal = true;       // Mostrar la tarjeta de objetivos
  }

  showTaskComponent(goal: Goal) {
    this.currentGoal = goal;
    this.showTask = true;     
    this.showGoal = false;   
  }
 closeSesion() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  reload(){
    this.rutinas.loadRoutines();
  }
}
