import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { EditarClienteComponent } from './cliente/editar/editarCliente.component';
import { NuevoClienteComponent } from './cliente/nuevo/nuevoCliente.component';
import { EditarPedidoComponent } from './pedido/editar/editarPedido.component';
import { NuevoPedidoComponent } from './pedido/nuevo/nuevoPedido.component';
import { PedidoComponent } from './pedido/pedido.component';
import { EditarPresupuestoComponent } from './presupuesto/editar/editarPresupuesto.component';
import { NuevoPresupuestoComponent } from './presupuesto/nuevo/nuevoPresupuesto.component';
import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {path: '', component: PrincipalComponent},

  {path: 'cliente/lista', component: ClienteComponent},
  {path: 'cliente/nuevo', component: NuevoClienteComponent},
  {path: 'cliente/editar/:id', component: EditarClienteComponent}, 

  {path: 'pedido/lista', component: PedidoComponent},
  {path: 'pedido/nuevo/:id', component: NuevoPedidoComponent},
  {path: 'pedido/editar/:id', component: EditarPedidoComponent},

  {path: 'presupuesto/lista', component: PresupuestoComponent},
  {path: 'presupuesto/nuevo/:id', component: NuevoPresupuestoComponent},
  {path: 'presupuesto/editar/:id', component: EditarPresupuestoComponent},

  {path: '**', redirectTo: 'lista', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }