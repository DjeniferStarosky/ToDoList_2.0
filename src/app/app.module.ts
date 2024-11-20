import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { MinhaListaComponent } from './minha-lista/minha-lista.component';
import { MeuDiaComponent } from './meu-dia/meu-dia.component';
import { ImportanteComponent } from './importante/importante.component';
import { AtrasadasComponent } from './atrasadas/atrasadas.component';
import { TemaComponent } from './tema/tema.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    MinhaListaComponent,
    MeuDiaComponent,
    ImportanteComponent,
    AtrasadasComponent,
    TemaComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
