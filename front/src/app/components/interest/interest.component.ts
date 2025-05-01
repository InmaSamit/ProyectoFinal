import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { InterestService, Interest } from '../../services/interest/interest.service';
import { CreateInterestComponent } from '../create-interest/create-interest.component';
import { EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [CommonModule, CreateInterestComponent],
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css']
})
export class InterestsComponent implements OnInit {
  interests: Interest[] = [];
  @Output() delete = new EventEmitter();
  @Output() goGoals = new EventEmitter<number>(); // Emite un id como parámetro
  showInterest = true;

  constructor(
    private interestService: InterestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadInterests();
  }

  loadInterests(): void {
    this.interestService.getInterests().subscribe({
      next: data => this.interests = data,
      error: err => console.error('Error cargando intereses', err)
    });
  }

  goToDetail(interestId: number): void {
    this.showInterest = false; 
    this.goGoals.emit(interestId); 
  }

  deleteInterest(id: number): void {
    this.interestService.deleteInterest(id).subscribe({
      next: () => {this.loadInterests(),this.delete.emit();},
      error: err => console.error('Error eliminando interés', err)
    });
  }
  showCreateModal = false;

  openModal() {
    this.showCreateModal = true;
  }

  closeModal() {
    this.showCreateModal = false;
  }

  reloadInterests() {
    this.loadInterests();
  }

}
