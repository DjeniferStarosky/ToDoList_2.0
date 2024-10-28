// tema.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemaService {
  private temaAtual: string = 'light'; 

  setTema(tema: string) {
    this.temaAtual = tema;
    document.body.className = ''; 
    document.body.classList.add(`${tema}-theme`);
  }

  getTema(): string {
    return this.temaAtual;
  }
}
