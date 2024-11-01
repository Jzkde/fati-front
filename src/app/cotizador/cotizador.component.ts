import { Component, OnInit } from '@angular/core';
import { CotizadorService } from '../service/cotizador.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css'],
})
export class CotizadorComponent implements OnInit {
  marca: string = '';

  sistema: string = '';
  precioSistema: number = 0;

  mecanismos: any[] = [];
  mecanismoN: string = '';

  telas: any[] = [];
  telaN: string = '';
  precioTela: number = 0;

  alto: number = 0;
  ancho: number = 0;

  colocaciones: any[] = [];
  colocN: string = '';
  precioColoc: number = 0;

  adicionales: any[] = [];
  adicional: number = 0;

  area: number = 0;

  resultado: any;

  cotizaciones: any[] = [];
  sumatoria: number = 0;
  contador: number = 1;

  error: string = "";

  constructor(
    private cotizadorService: CotizadorService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.ancho = +params['ancho'] || 0;
      this.alto = +params['alto'] || 0;
    });
  }

  ngOnInit(): void {
    const savedCotizaciones = localStorage.getItem('cotizaciones');
    const savedSumatoria = localStorage.getItem('sumatoria');

    if (savedCotizaciones) {
      this.cotizaciones = JSON.parse(savedCotizaciones);
    }

    if (savedSumatoria) {
      this.sumatoria = parseFloat(savedSumatoria);
    }
  }

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
      (data) => (this.telas = data),
      (error) => {
        this.error = 'Error al cargar las telas disponibles';
        this.telas = [];
      }
    );
    this.cotizadorService.getSistemasFlex(this.sistema).subscribe(
      (data) => (this.mecanismos = data),
      (error) => {
        this.error = 'Error al cargar los mecanismos disponibles';
        this.mecanismos = [];
      }
    );
    this.cotizadorService.getAdicionalesFlex().subscribe(
      (data) => (this.adicionales = data),
      (error) => {
        this.error = 'Error al cargar los adicionales disponibles';
        this.adicionales = [];
      }
    );
  }

  cotizar(): void {
    const area = this.calcularArea();
    if (this.marca == 'RC') {
      this.cotizadorService
        .cotizarRoyal(this.telaN, this.alto, this.ancho, this.sistema)
        .subscribe(
          (data) => {
            this.resultado = data + this.precioColoc + this.adicional;
            this.error = '';
          },
          (error) => {
            this.resultado = null;
            this.error = error.error.text;
          }
        );
    } else if (this.marca == 'FLEX') {
      this.cotizadorService
        .cotizarFlex(this.telaN, this.alto, this.ancho, this.sistema)
        .subscribe(
          (data) => {
            this.resultado = data + this.precioColoc + this.adicional;
            this.error = '';
          },
          (error) => {
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
      const nuevaCotizacion = {
        contador: this.contador,
        monto: this.resultado,
      };
      this.cotizaciones.push(nuevaCotizacion);
      this.sumatoria += this.resultado;
      this.resultado = null;
      this.contador++;
      localStorage.setItem('cotizaciones', JSON.stringify(this.cotizaciones));
      localStorage.setItem('sumatoria', this.sumatoria.toString());
    }
  }

  borrar(): void {
    this.cotizaciones = [];
    this.sumatoria = 0;
    this.contador = 1;
    localStorage.removeItem('cotizaciones');
    localStorage.removeItem('sumatoria');
  }
}
