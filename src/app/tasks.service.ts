import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private apiUrl = 'http://localhost/todolist/backend/apis/list.php'; 

  constructor(private http: HttpClient) {}

  getTasks(listType: string, userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}?type=${listType}&user_id=${userId}`);
  }
}
