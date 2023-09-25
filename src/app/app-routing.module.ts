import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarComponent } from './pedido/editar/editar.component';
import { NuevoComponent } from './pedido/nuevo/nuevo.component';
import { PedidoComponent } from './pedido/pedido.component';

const routes: Routes = [
  {path: '', component: PedidoComponent},
  {path: 'lista', component: PedidoComponent},
  {path: 'nuevo', component: NuevoComponent},
  {path: 'editar/:id', component: EditarComponent},
  {path: '**', redirectTo: 'lista', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
