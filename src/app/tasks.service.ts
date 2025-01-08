import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private baseApiUrl = 'http://localhost/todolist/backend/apis';

  constructor(private http: HttpClient) {}

  // Método para listar tarefas
  getTasks(listType: string, userId: number): Observable<any> {
    console.log('Enviando user_id:', userId);
    return this.http.get(`${this.baseApiUrl}/list.php?type=${listType}&user_id=${userId}`);
  }

  // Método para atualizar tarefa
  updateTask(id: number, important: number, status: string): Observable<any> {
    const url = `${this.baseApiUrl}/update.php`;
    const body = { id, important, status };
    return this.http.put(url, body);
  }
}
