import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component'; // Importação do LayoutComponent
import { MinhaListaComponent } from './minha-lista/minha-lista.component';
import { MeuDiaComponent } from './meu-dia/meu-dia.component';
import { ImportanteComponent } from './importante/importante.component';
import { AtrasadasComponent } from './atrasadas/atrasadas.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redireciona para login por padrão
  { path: 'login', component: LoginComponent }, // Tela de login
  { 
    path: '', 
    component: LayoutComponent, // Layout principal
    children: [
      { path: 'minha-lista', component: MinhaListaComponent },
      { path: 'meu-dia', component: MeuDiaComponent },
      { path: 'importante', component: ImportanteComponent },
      { path: 'atrasadas', component: AtrasadasComponent },
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
