import { Component } from '@angular/core';
import { CotizadorService } from '../service/cotizador.service';
import { CompileIdentifierMetadata } from '@angular/compiler';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css']
})
export class CotizadorComponent {
  telaN: string = "";
  alto: number = 0;
  ancho: number = 0;
  sistema: string = "";
  resultado: any;
  error: string = "";
  telas: any[] = [];
  mecanismos: any[] = [];
  mecanismoN: string = "";
  area: number = 0;
  marca: string = "";

  precioTela: number = 0;
  precioSistema: number = 0;

  cotizaciones: any[] = [];
  sumatoria: number = 0;

  constructor(private cotizadorService: CotizadorService) { }
  
  onMarca(): void{
    this.sistema = "";
  }

  onTelaChange() {
    const selectedTela = this.telas.find(t => t.tela === this.telaN);
    this.precioTela = selectedTela ? selectedTela.precio : 0;
  }

  onMecanismoChange() {
    const selectedMecanismo = this.mecanismos.find(m => m.tela === this.mecanismoN);
    this.precioSistema = selectedMecanismo ? selectedMecanismo.precio : 0;
  }
  onSistemaRoyal(): void {
    this.telaN = '';
    this.mecanismoN = '';
    this.telas = [];
    this.mecanismos = [];
    this.precioTela = 0;
    this.precioSistema = 0;
    this.resultado = 0;

    if (this.sistema) {
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
    }
  }
  cotizarRoyal(): void {
    const area = this.calcularArea();
    this.cotizadorService.cotizarRoyal(this.telaN, this.alto, this.ancho, this.sistema)
      .subscribe(
        data => {
          this.resultado = data;
          this.error = "";
          console.log(this.resultado);

        },
        error => {
          this.resultado = null;
          this.error = error.error.text;
          console.log(error.error.text);

        }
      );
  }
 
  onSistemaFlex(): void {
    this.telaN = '';
    this.mecanismoN = '';
    this.telas = [];
    this.mecanismos = [];
    this.precioTela = 0;
    this.precioSistema = 0;
    this.resultado = 0;

    if (this.sistema) {
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
    }
  }
  cotizarFlex(): void {
    const area = this.calcularArea();
    this.cotizadorService.cotizarFlex(this.telaN, this.alto, this.ancho, this.sistema)
      .subscribe(
        data => {
          this.resultado = data;
          this.error = "";
          console.log(this.resultado);

        },
        error => {
          this.resultado = null;
          this.error = error.error.text;
          console.log(error.error.text);

        }
      );
  }
  calcularArea(): number {
    return this.alto * this.ancho / 10000;
  }
  agregarCotizacion(): void {
    if (this.resultado) {
      this.cotizaciones.push(this.resultado);
      this.sumatoria += this.resultado;
      this.resultado = null;
    }
  }
  borrar():void{
    this.cotizaciones = []
    this.sumatoria = 0
  }
}
