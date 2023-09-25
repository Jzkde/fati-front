import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PedidoComponent } from './pedido/pedido.component';

import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NuevoComponent } from './pedido/nuevo/nuevo.component';
import { EditarComponent } from './pedido/editar/editar.component';


@NgModule({
  declarations: [
    AppComponent,
    PedidoComponent,
    NuevoComponent,
    EditarComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
