import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinhaListaComponent } from './minha-lista/minha-lista.component';
import { MeuDiaComponent } from './meu-dia/meu-dia.component';
import { ImportanteComponent } from './importante/importante.component';
import { AtrasadasComponent } from './atrasadas/atrasadas.component';

const routes: Routes = [
  { path: 'minha-lista', component: MinhaListaComponent },
  { path: 'meu-dia', component: MeuDiaComponent },
  { path: 'importante', component: ImportanteComponent },
  { path: 'atrasadas', component: AtrasadasComponent },
  { path: '', redirectTo: '/minha-lista', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
