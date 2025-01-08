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
          // Supondo que a resposta inclua os dados do usuário (id, username, token)
          const user = {
            id: response.user_id,          // id do usuário retornado pela API
            username: response.username,   // username do usuário
            token: response.token          // token do usuário
          };
  
          // Salve o objeto completo de usuário no localStorage
          localStorage.setItem('user', JSON.stringify(user));
  
          // Se necessário, chame o método para atualizar o ID do usuário logado
          this.authService.setAuthentication(response.token);  // Salva o token gerado
          this.authService.setUser(response.username); // Salvar o nome do usuário
  
          // Redireciona para a página 'minha-lista'
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
