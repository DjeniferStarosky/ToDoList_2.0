import { Component } from '@angular/core';
import { TemaService } from '../tema.service'; 

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(private temaService: TemaService) {}

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
    console.log('Usuário saiu');
  }
}
