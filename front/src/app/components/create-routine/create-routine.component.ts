// src/app/components/create-routine/create-routine.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RoutineService } from '../../services/interest/routine.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-create-routine',
  templateUrl: './create-routine.component.html',
})
export class CreateRoutineComponent {
  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  newRoutine = {
    name: '',
    user_id: 2, // Reemplaza esto si usas auth real
  };

  constructor(private routineService: RoutineService) { }

  createRoutine() {
    if (!this.newRoutine.name.trim()) return;
    this.routineService.create(this.newRoutine).subscribe(() => {
      this.created.emit();
      this.close.emit();
    });
  }

  closeModal() {
    this.close.emit();
  }
}
