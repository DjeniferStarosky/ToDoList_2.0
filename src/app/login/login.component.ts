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

    this.authService.login(username, password).subscribe(
      response => {
        if (response && response.message === 'Login bem-sucedido.') {
          // Se o login for bem-sucedido, armazene informações relevantes
          this.authService.setAuthentication(response.token);  // Salva o token gerado
          this.authService.setUser(response.username); // Salvar o nome do usuário
          this.router.navigate(['/minha-lista']);
        } else {
          this.message = response.message || 'Erro desconhecido. Tente novamente em instantes.';
          this.loginData.username = '';
          this.loginData.password = '';
        }
      },
      error => {
        this.message = 'Erro ao tentar efetuar login. Tente novamente.';
        console.error(error);
      }
    );
  }


  register() {
    const { username, password, confirmPassword } = this.registerData;
  
    if (password !== confirmPassword) {
      this.message = 'As senhas não coincidem!';
      return;
    }
  
    this.authService.register(username, password).subscribe(
      response => {
        if (response && response.message === 'Usuário cadastrado com sucesso.') {
          this.message = response.message; // Mensagem de sucesso
          this.isRegistering = false; // Volta para a tela de login
          this.registerData.username = '';
          this.registerData.password = '';
          this.registerData.confirmPassword = '';
        } else {
          this.message = response.message || 'Erro desconhecido no cadastro.';
        }
      },
      error => {
        this.message = 'Erro ao tentar registrar o usuário. Tente novamente.';
        console.error(error);
      }
    );
  }
  

  toggleForm() {
    this.isRegistering = !this.isRegistering;
    this.message = '';
  }


  
}
