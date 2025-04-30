import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InterestService, Interest } from '../../services/interest/interest.service';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css']
})
export class InterestsComponent implements OnInit {
  interests: Interest[] = [];

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

  goToDetail(id: number): void {
    this.router.navigate([`/intest/${id}`]);
  }

  deleteInterest(id: number): void {
    this.interestService.deleteInterest(id).subscribe({
      next: () => this.loadInterests(),
      error: err => console.error('Error eliminando interés', err)
    });
  }
}
