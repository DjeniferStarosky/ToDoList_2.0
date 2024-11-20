import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  private temaKey = 'selectedTema'; // Chave para armazenar no Local Storage

  constructor() {}

  // Método para obter o tema atual
  getTema(): string {
    const temaSalvo = localStorage.getItem(this.temaKey);
    return temaSalvo ? temaSalvo : 'light'; 
  }

  // Método para definir um novo tema
  setTema(tema: string): void {
    localStorage.setItem(this.temaKey, tema); // Salva o tema no Local Storage
    document.body.classList.remove('light', 'dark', 'color');
    document.body.classList.add(tema); // Aplica o tema no body
  }
}
