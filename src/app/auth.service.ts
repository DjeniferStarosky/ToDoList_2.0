import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated: boolean = false;

  constructor(private router: Router) { }

  // Método para realizar o login (simulado)
  login(username: string, password: string): boolean {
    // Simulação de login, substitua com lógica real de autenticação
    if (username === 'DjeniStarosky' && password === '1234') {
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  // Método para realizar o logout
  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);  // Redireciona para a tela de login
  }

  // Método para verificar se o usuário está autenticado
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
