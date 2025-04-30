import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService, User, Token } from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  private router = inject(Router);
  private loginService = inject(LoginService);

  nombre: string = '';
  contrasena: string = '';

  login(): void {
    debugger
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

  ngOnDestroy(): void {
    console.log('LoginComponent destruido')
  }
}