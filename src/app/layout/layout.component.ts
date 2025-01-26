import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemaService } from '../tema.service';
import { AuthService } from '../auth.service';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  descricao: string = '';
  dataHora: string = '';
  importante: boolean = false;
  userName: string | null = null;

  constructor(
    private temaService: TemaService,
    private router: Router,
    private authService: AuthService,
    private tasksService: TasksService
  ) {}

  ngOnInit(): void {
    const temaAtual = this.temaService.getTema();
    document.body.classList.add(temaAtual);
    this.userName = this.authService.getUser();
  }

  toggleImportante(): void {
    this.importante = !this.importante;
  }

  // Adicionar tarefa ao banco de dados
insertTarefa(): void {
  const userId = this.authService.getUserId();
  if (!userId) {
    alert('Erro: Usuário não autenticado.');
    return;
  }

  if (!this.descricao || !this.dataHora) {
    alert('Preencha todos os campos antes de adicionar a tarefa.');
    return;
  }

  const novaTarefa = {
    user_id: userId,
    description: this.descricao,
    date_time: this.dataHora,
    important: this.importante ? 1 : 0
  };

  this.tasksService.createTask(novaTarefa).subscribe({
    next: (res) => {
      window.location.reload(); 

      // Resetar os campos do formulário
      this.descricao = '';
      this.dataHora = '';
      this.importante = false;
    },
    error: (err) => {
      console.error(err);
      alert('Erro ao criar tarefa.');
    }
  });
}

  navegarPara(rota: string): void {
    this.router.navigate([rota]);
  }

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
