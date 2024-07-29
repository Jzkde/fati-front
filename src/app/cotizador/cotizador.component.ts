import { Component } from '@angular/core';
import { CotizadorService } from '../service/cotizador.service';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css']
})
export class CotizadorComponent {
  alto: number = 0;
  ancho: number = 0;
  sistema: string = "";
  resultado: any;
  error: string = "";
  
  telas: any[] = [];
  telaN: string = "";
  mecanismos: any[] = [];
  mecanismoN: string = "";
  adicionales: any[] = [];
  colocaciones: any[] = [];
  colocN: string = '';

  area: number = 0;
  marca: string = "";
  adicional: number = 0;

  precioTela: number = 0;
  precioColoc: number = 0;
  precioSistema: number = 0;

  cotizaciones: any[] = [];
  sumatoria: number = 0;

  constructor(private cotizadorService: CotizadorService) { }

  onMarca(): void {
    this.sistema = "";
  }

  onTelaChange() {
    const selectedTela = this.telas.find(t => t.tela === this.telaN);
    this.precioTela = selectedTela ? selectedTela.precio : 0;
  }

  onColocChange() {
    const coloc = this.colocaciones.find(c => c.tipo === this.colocN);
    this.precioColoc = coloc ? coloc.precio : 0;
  }

  onMecanismoChange() {
    const selectedMecanismo = this.mecanismos.find(m => m.tela === this.mecanismoN);
    this.precioSistema = selectedMecanismo ? selectedMecanismo.precio : 0;
  }

  onSistema(): void {
    this.telaN = '';
    this.mecanismoN = '';
    this.telas = [];
    this.mecanismos = [];
    this.precioTela = 0;
    this.precioSistema = 0;
    this.resultado = null;
    this.error = "";
    
    if (this.sistema) {
      this.cotizadorService.getColocaciones().subscribe(
        data => this.colocaciones = data,
        error => {
          this.error = 'Error al cargar las colocaciones';
          this.colocaciones = [];
        }
      );
      
      if (this.marca == 'RC') {
        this.cargarDatosRoyal();
      } else if (this.marca == 'FLEX') {
        this.cargarDatosFlex();
      }
    }
  }

  cargarDatosRoyal(): void {
    this.cotizadorService.getTelasRoyal(this.sistema).subscribe(
      data => this.telas = data,
      error => {
        this.error = 'Error al cargar las telas disponibles';
        this.telas = [];
      }
    );
    this.cotizadorService.getSistemasRoyal(this.sistema).subscribe(
      data => this.mecanismos = data,
      error => {
        this.error = 'Error al cargar los mecanismos disponibles';
        this.mecanismos = [];
      }
    );
    this.cotizadorService.getAdicionalesRoyal().subscribe(
      data => this.adicionales = data,
      error => {
        this.error = 'Error al cargar los adicionales disponibles';
        this.adicionales = [];
      }
    );
  }

  cargarDatosFlex(): void {
    this.cotizadorService.getTelasFlex(this.sistema).subscribe(
      data => this.telas = data,
      error => {
        this.error = 'Error al cargar las telas disponibles';
        this.telas = [];
      }
    );
    this.cotizadorService.getSistemasFlex(this.sistema).subscribe(
      data => this.mecanismos = data,
      error => {
        this.error = 'Error al cargar los mecanismos disponibles';
        this.mecanismos = [];
      }
    );
    this.cotizadorService.getAdicionalesFlex().subscribe(
      data => this.adicionales = data,
      error => {
        this.error = 'Error al cargar los adicionales disponibles';
        this.adicionales = [];
      }
    );
  }

  cotizar(): void {
    const area = this.calcularArea();
    if (this.marca == 'RC') {
      this.cotizadorService.cotizarRoyal(this.telaN, this.alto, this.ancho, this.sistema)
        .subscribe(
          data => {
            this.resultado = data + this.precioColoc + this.adicional;
            this.error = "";
          },
          error => {
            this.resultado = null;
            this.error = error.error.text;
          }
        );
    } else if (this.marca == 'FLEX') {
      this.cotizadorService.cotizarFlex(this.telaN, this.alto, this.ancho, this.sistema)
        .subscribe(
          data => {
            this.resultado = data + this.precioColoc + this.adicional;
            this.error = "";
          },
          error => {
            this.resultado = null;
            this.error = error.error.text;
          }
        );
    }
  }

  calcularArea(): number {
    return this.alto * this.ancho / 10000;
  }

  agregarCotizacion(): void {
    if (this.resultado && typeof this.resultado === 'number') {
      this.cotizaciones.push(this.resultado);
      this.sumatoria += this.resultado;
      this.resultado = null;
    }
  }

  borrar(): void {
    this.cotizaciones = [];
    this.sumatoria = 0;
  }
}
