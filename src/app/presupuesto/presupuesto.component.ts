import { Component, OnInit } from '@angular/core';
import { Presupuesto } from '../models/presupuesto';
import { PresupuestoService } from '../service/presupuesto.service';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit {

  presupuestos: Presupuesto[] = [];

  constructor(
    private presupuestoService: PresupuestoService,
  ) { }
  ngOnInit(): void {
    this.lista();
  }

  lista(): void {
    this.presupuestoService.lista().subscribe(
      data => {
        this.presupuestos = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
