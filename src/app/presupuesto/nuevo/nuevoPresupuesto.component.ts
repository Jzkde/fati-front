import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Presupuesto } from 'src/app/models/presupuesto';
import { PresupuestoService } from 'src/app/service/presupuesto.service';

@Component({
  selector: 'app-nuevoPresupuesto',
  templateUrl: './nuevoPresupuesto.component.html',
  styleUrls: ['./nuevoPresupuesto.component.css']
})
export class NuevoPresupuestoComponent implements OnInit {

  sistema: string = '';
  ancho: number = 0;
  alto: number = 0;
  comando: string = 'NO_POSEE';
  apertura: string = 'NO_POSEE';
  cliente: string = ""
  accesorios: string = '';
  ambiente: string = '';
  observaciones: string = '';

  constructor(
    private router: Router,
    private presupuestoService: PresupuestoService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.toastr.clear();
  }
  
  crear(): void {
    const npresup = new Presupuesto(
      this.sistema,
      this.ancho,
      this.alto,
      this.comando,
      this.apertura,
      this.cliente,
      this.accesorios,
      this.ambiente,
      this.observaciones,
    );
    this.presupuestoService.nuevo(npresup).subscribe(
      data => {
        this.toastr.success('Presupuesto Creado', 'OK', {
        });
        this.router.navigate(['/presupuesto/lista'])
      },
      err => {
        this.toastr.error(err.error, 'ERROR', {
          timeOut: 5000,
          positionClass: 'toast-center-center'
        });
      }
    )
  }
}