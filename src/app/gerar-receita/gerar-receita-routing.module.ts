import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GerarReceitaPage } from './gerar-receita.page';

const routes: Routes = [
  {
    path: '',
    component: GerarReceitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GerarReceitaPageRoutingModule {}
