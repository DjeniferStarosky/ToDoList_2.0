import { Component, OnInit } from '@angular/core';
import { TemaService } from '../tema.service'; 

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
  constructor(private temaService: TemaService) {}

  ngOnInit(): void {
    this.temaService.setTema('light'); 
  }

  selecionarTema(event: Event): void {
    const temaSelecionado = (event.target as HTMLSelectElement).value;
    this.temaService.setTema(temaSelecionado);
  }
}
