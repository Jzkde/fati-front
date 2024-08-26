import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Confeccion } from 'src/app/models/confeccion';
import { ConfeccionService } from 'src/app/service/confeccion.service';

@Component({
  selector: 'app-nueva-confeccion',
  templateUrl: './nueva-confeccion.component.html',
  styleUrls: ['./nueva-confeccion.component.css']
})
export class NuevaConfeccionComponent implements OnInit {

  ancho: number = 0; 
  alto: number = 0; 
  apertura: string = 'NO_POSEE'
  accesorios: string = '' 
  ambiente: string = '' 
  observaciones: string = ''
  clienteNombre: string = '' 

  constructor(
    private router: Router,
    private confeccionService: ConfeccionService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.toastr.clear();
  }

  crear(): void {
    const nConfec = new Confeccion(
      this.ancho,
      this.alto,
      this.apertura,
      this.accesorios,
      this.ambiente,
      this.observaciones,
      this.clienteNombre
      
    );
    this.confeccionService.nuevo(nConfec).subscribe(
      data => {
        this.toastr.success('Confeccion Creada', 'OK', {
        });
        this.router.navigate(['/confeccion/lista'])
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