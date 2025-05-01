import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  @Output() closed = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();

  user = { name: '', email: '', phone: '', password: '' };

  constructor(private http: HttpClient) {}

  register() {
    this.http.post(`${environment.apiUrl}/users/register`, this.user).subscribe({
      next: () => {
        alert('Usuario creado');
        this.success.emit();
      },
      error: (err) => {
        alert('Error al registrar');
        console.error(err);
      }
    });
  }

  cancel() {
    this.closed.emit();
  }
}
