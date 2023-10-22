import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { PedidoComponent } from './pedido/pedido.component';
import { NuevoPedidoComponent } from './pedido/nuevo/nuevoPedido.component';
import { EditarPedidoComponent } from './pedido/editar/editarPedido.component';

import { PresupuestoComponent } from './presupuesto/presupuesto.component';
import { NuevoPresupuestoComponent } from './presupuesto/nuevo/nuevoPresupuesto.component';
import { EditarPresupuestoComponent } from './presupuesto/editar/editarPresupuesto.component';

import { ClienteComponent } from './cliente/cliente.component';
import { NuevoClienteComponent } from './cliente/nuevo/nuevoCliente.component';
import { EditarClienteComponent } from './cliente/editar/editarCliente.component';
import { UnoComponent } from './cliente/uno/uno.component';

import { PrincipalComponent } from './principal/principal.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [
    AppComponent,
    PedidoComponent,
    NuevoPedidoComponent,
    EditarPedidoComponent,
    PresupuestoComponent,
    ClienteComponent,
    NuevoPresupuestoComponent,
    EditarPresupuestoComponent,
    NuevoClienteComponent,
    EditarClienteComponent,
    PrincipalComponent,
    UnoComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    CollapseModule.forRoot(),
    AlertModule.forRoot()
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
