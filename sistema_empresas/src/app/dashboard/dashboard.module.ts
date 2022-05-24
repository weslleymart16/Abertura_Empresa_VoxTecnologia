import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardService } from './services/dashboard.service';
import { EditarCadastroComponent } from './editar-cadastro/editar-cadastro.component';

@NgModule({
  declarations: [ DashboardComponent, EditarCadastroComponent ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ],
  providers: [ DashboardService ],
})

export class DashboardModule {


}
