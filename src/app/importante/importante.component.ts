import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service'; 

@Component({
  selector: 'app-importante',
  templateUrl: './importante.component.html',
  styleUrl: './importante.component.css'
})
export class ImportanteComponent implements OnInit {
  tasks: any[] = [];
  loggedUserId: number = 0;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.loggedUserId = this.getLoggedUserId(); // Pega o ID do usuário logado de alguma fonte
    if (this.loggedUserId) {
      this.loadTasks();
    } else {
      console.error('Usuário não logado');
    }
  }

  getLoggedUserId(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.id || 0; 
  }

  loadTasks(): void {
    this.tasksService.getTasks('importante', this.loggedUserId).subscribe({
      next: (data: any) => {
        this.tasks = data;
        console.log('Tarefas recebidas:', this.tasks);//REMOVER ESSA LINHA
      }, 
      error: err => console.error('Erro ao carregar tarefas:', err)
    });
  }
  

   // Atualizar a prioridade (campo important)
   toggleImportant(task: any): void {
    const updatedImportant = task.important === 1 ? 0 : 1; 
    this.tasksService.updateTask(task.id, updatedImportant, task.status).subscribe({
      next: response => {
        console.log(`Tarefa ${task.id} atualizada com sucesso:`, response); //REMOVER ESSA LINHA
        task.important = updatedImportant; // Atualiza localmente para refletir na UI
      },
      error: err => console.error('Erro ao atualizar tarefa:', err)
    });
  }


    // Concluir a tarefa (campo status)
    concluirTarefa(task: any): void {
      const updatedStatus = 'concluido'; 
      this.tasksService.updateTask(task.id, task.important, updatedStatus).subscribe({
        next: response => {
          console.log(`Tarefa ${task.id} concluída com sucesso:`, response);
          this.loadTasks(); // Recarrega as tarefas para refletir as mudanças
        },
        error: err => console.error('Erro ao concluir tarefa:', err)
      });
    }

 // Formatar data
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
}