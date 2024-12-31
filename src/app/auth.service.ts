import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost/TODOLIST/backend/apis/login.php'; 
  private isAuthenticated: boolean = false;
  private username: string | null = null;

  constructor(private router: Router, private http: HttpClient) { }

  // Método para realizar o login
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    // Envia os dados para a API de login
    return this.http.post<any>(this.apiUrl, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Método para verificar se o usuário está autenticado
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  // Método para registrar um novo usuário
  register(username: string, password: string): Observable<any> {
    const url = 'http://localhost/TODOLIST/backend/apis/create_user.php'; 
    const body = { username, password };

    return this.http.post<any>(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  // Método para realizar o logout
  logout(): void {
    this.isAuthenticated = false;
    localStorage.removeItem('token'); // Remover o token do localStorage
    this.router.navigate(['/login']);  // Redireciona para a tela de login
  }

  // Método para armazenar o token no localStorage e atualizar o estado de autenticação
  setAuthentication(token: string): void {
    this.isAuthenticated = true;
    localStorage.setItem('token', token); // Armazena o token no localStorage
  }


  // Método para obter o token do localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Método para obter o nome do usuario e armazenar
  setUser(username: string): void {
    this.username = username;
    localStorage.setItem('username', username); 
  }
  
  getUser(): string | null {
    if (!this.username) {
      this.username = localStorage.getItem('username'); // Recupera do localStorage, se necessário
    }
    return this.username;
  }



}