import { Component, EventEmitter, Output } from '@angular/core';
import { InterestService, Interest } from '../../services/interest/interest.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-create-interest',
  standalone: true,
  templateUrl: './create-interest.component.html',
  styleUrls: ['./create-interest.component.css'],
  imports: [CommonModule, FormsModule]
})
export class CreateInterestComponent {
  interest: Interest = { id: 0, title: '', description: '' };

  @Output() close = new EventEmitter<void>();
  @Output() created = new EventEmitter<void>();

  constructor(private interestService: InterestService) {}

  cancel() {
    this.close.emit();
  }

  create() {
    this.interestService.createInterest(this.interest).subscribe(() => {
      alert('Interés creado');
      this.created.emit();
      this.cancel();
    });
  }
}
