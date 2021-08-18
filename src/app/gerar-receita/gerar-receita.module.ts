import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GerarReceitaPageRoutingModule } from './gerar-receita-routing.module';

import { GerarReceitaPage } from './gerar-receita.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GerarReceitaPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [GerarReceitaPage]
})
export class GerarReceitaPageModule {}
