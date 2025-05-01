import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { routes } from './app.routes';

import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    console.log("Añadiendo token...");
    const token = sessionStorage.getItem('token');
    var router = inject(Router);
    
    // Si el token no existe, o es el endpoint de registro... redirige al login
    if (!token && !req.url.includes("users")) {
        router.navigate(['/login']); // Redirige a la página de login
        return new Observable<HttpEvent<any>>(); // Detiene la solicitud HTTP
        }
    
    req = req.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    })
  // Continuamos con la solicitud
  return next(req).pipe(
    catchError((error) => {
      // Si la respuesta es un error 401 o 403, redirigimos al login
      if (error.status === 401 || error.status === 403) {
        console.log('Token inválido o no autorizado. Redirigiendo a login...');
        router.navigate(['/login']);
      }
      // Si el error es otro, simplemente lo lanzamos
      return throwError(error);
    })
  );
  };