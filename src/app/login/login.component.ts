import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { username: '', password: '' };
  registerData = { username: '', password: '', confirmPassword: '' };
  isRegistering = false;
  message = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    const { username, password } = this.loginData;

    if (this.authService.login(username, password)) {
        this.router.navigate(['/minha-lista']); 
    } else {
      this.message = 'Usuário ou senha inválidos!';
      this.loginData.username = '';
      this.loginData.password = '';
    }
  }

  register() {
    const { username, password, confirmPassword } = this.registerData;

    if (password !== confirmPassword) {
      this.message = 'As senhas não coincidem!';
      return;
    }

    // >>>>> Adicionar lógica para salvar o novo usuário no banco de dados <<<<
    console.log('Novo usuário registrado:', username);

    this.isRegistering = false;
    this.message = 'Usuário registrado com sucesso! Agora você pode fazer login.';

    this.registerData.username = '';
    this.registerData.password = '';
    this.registerData.confirmPassword = '';
  }

  toggleForm() {
    // Alterna entre os modos de login e cadastro
    this.isRegistering = !this.isRegistering;
    this.message = '';
  }

}
