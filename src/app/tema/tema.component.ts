import { Component, OnInit } from '@angular/core';
import { TemaService } from '../tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
  dropdownOpen = false;

  constructor(private temaService: TemaService) {}

  ngOnInit(): void {
    const temaAtual = this.temaService.getTema(); 
    document.body.classList.add(temaAtual); // Aplica o tema recuperado
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selecionarTema(tema: string): void {
    this.temaService.setTema(tema); // Salva e aplica o novo tema
    this.dropdownOpen = false; // Fecha o dropdown
  }
}
