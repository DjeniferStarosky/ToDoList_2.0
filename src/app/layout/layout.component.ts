import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TemaService } from '../tema.service'; 

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  descricao: string = '';  // Variável para o campo de descrição
  dataHora: string = '';   // Variável para o campo de data/hora
  importante: boolean = false;  // Variável para controlar se a tarefa é importante

  constructor(private temaService: TemaService, private router: Router) {}

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
    // Aqui você pode adicionar a lógica para salvar os dados, como enviar para um backend
  }

  // Método para garantir que o tema esteja aplicado ao carregar a página
  ngOnInit(): void {
    const temaAtual = this.temaService.getTema();
    document.body.classList.add(temaAtual);
  }

  // Método para navegar para outras rotas
  navegarPara(rota: string): void {
    this.router.navigate([rota]);
  }

  // Verifica se a rota está ativa
  rotaAtiva(rota: string): boolean {
    return this.router.url.startsWith(rota);
  }

  // Método para obter o avatar conforme o tema
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

  // Método de logout
  logout(): void {
    console.log('Usuário saiu');
  }
}
