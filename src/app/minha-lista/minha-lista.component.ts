import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-minha-lista',
  templateUrl: './minha-lista.component.html',
  styleUrls: ['./minha-lista.component.css']
})
export class MinhaListaComponent implements OnInit {
  tasks: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.http.get('http://localhost/todolist/backend/apis/list.php?type=minha-lista').subscribe({
      next: (data: any) => {
        this.tasks = data;
        console.log('Tarefas recebidas:', this.tasks); // Exibe todas as tarefas no console
        this.tasks.forEach(task => {
          console.log(`Tarefa ID: ${task.id}, Descrição: ${task.description}, Important: ${task.important}`);
        });
      },
      error: err => console.error('Erro ao carregar tarefas:', err)
    });
  }
  

  formatDate(dateTime: string): string {
    const date = new Date(dateTime);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleDateString('pt-BR', options).replace(',', ' -');
  }
  

  concluirTarefa(task: any): void {
    console.log(`Tarefa ${task.id} concluída!`);
    // Lógica para alterar o status da tarefa será implementada posteriormente.
  }
  
}
