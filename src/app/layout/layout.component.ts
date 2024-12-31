import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemaService } from '../tema.service'; 
import { AuthService } from '../auth.service'; 



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  descricao: string = '';
  dataHora: string = ''; 
  importante: boolean = false;
  userName: string | null = null;

  constructor(
    private temaService: TemaService, 
    private router: Router, 
    private authService: AuthService 
  ) {}

  // Método para alternar a marcação de importante
  toggleImportante(): void {
    this.importante = !this.importante;
  }

  // Método para enviar o formulário
  onSubmit(event: Event): void {
    event.preventDefault();  // Evita o comportamento padrão do formulário (recarregar a página)
    console.log('Tarefa:', this.descricao);
    console.log('Data e Hora:', this.dataHora);
    console.log('Importante:', this.importante);
    // >>>>>adicionar a lógica para salvar os dados no banco<<<<
  }


  ngOnInit(): void {
    // Garantir que o tema esteja aplicado
    const temaAtual = this.temaService.getTema();
    document.body.classList.add(temaAtual);

    // Recuperar o nome do usuário logado
    this.userName = this.authService.getUser();
  }

  // Método para navegar para outras rotas
  navegarPara(rota: string): void {
    this.router.navigate([rota]);
  }

  // Verifica se a rota está ativa
  rotaAtiva(rota: string): boolean {
    return this.router.url.startsWith(rota);
  }

 
  getAvatar(): string {
    const temaAtual = this.temaService.getTema(); 
    switch (temaAtual) {
      case 'dark':
        return 'avatar2.png';
      case 'color':
        return 'avatar3.png';
      case 'light':
      default:
        return 'avatar1.png';
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
