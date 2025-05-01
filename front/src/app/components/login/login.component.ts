import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService, User, Token } from '../../services/login/login.service';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RegisterUserComponent,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  private router = inject(Router);
  private loginService = inject(LoginService);

  nombre: string = '';
  contrasena: string = '';

  login(): void {

    if(this.nombre !== '' && this.contrasena !== '') {
      const user: User = {
        name: this.nombre,
        password: this.contrasena,
      };

      this.loginService.postLogin(user).subscribe({
        next: (token) => {
          
          sessionStorage.setItem('token', token.token); // ✅ guarda el token devuelto por el backend
          this.router.navigate(['/profile']);
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          alert('Login incorrecto');
        },
    });
    }
  }

  showRegister = false;

  toggleRegister() {
    this.showRegister = !this.showRegister;
  }

  onRegisterSuccess() {
    this.toggleRegister();
    this.nombre = '';
    this.contrasena = '';
  }

  ngOnDestroy(): void {
    console.log('LoginComponent destruido')
  }
}