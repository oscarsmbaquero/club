import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { UsersService } from '../../core/services/users/users.service';
import { PartysService } from '../../core/services/partys/partys.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';

@Component({
  selector: 'app-partys',
  standalone: true,
  imports: [LoadingComponent, CommonModule],
  templateUrl: './partys.component.html',
  styleUrl: './partys.component.css',
})
export class PartysComponent {
  //TO TIPAR
  partys: any;
  isScrolled = false;

  constructor(private partysService: PartysService) {}
  
  loading = false;


  ngOnInit(): void {
    this.loading = true;
    this.getPartis();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollThreshold = 100; // Punto de desplazamiento para cambiar el color
    this.isScrolled = window.scrollY >= scrollThreshold;
    console.log(this.isScrolled);
    
  }

  /**
   * Obtiene las fiestas ya creadas
   */
  getPartis() {
    this.partysService.getPartys().subscribe((element) => {
      this.partys = this.formatDates(element);
      this.loading = false;
    });
  }

  /**
   * Obtenermos el mes en curso para el título
   * @returns
   */
  obtenerMesActual() {
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth();

    return meses[mesActual];
  }

  //TODO REVISAR PARA QUITAR LA SUMA DE UN DIA, ESTABLECER LOCALE EN MAIN.TS
  /**
   * Obtiene la fecha de la fiesta creada
   * @param events
   * @returns
   */
  formatDates(events: any[]): any[] {
    return events.map((event) => {
      const date = new Date(event.fecha);
      date.setUTCDate(date.getUTCDate() + 1); // Sumar un día

      const formattedDate =
        date.getUTCDate().toString().padStart(2, '0') +
        '/' +
        (date.getUTCMonth() + 1).toString().padStart(2, '0') +
        '/' +
        date.getUTCFullYear();

      return {
        ...event,
        fecha: formattedDate,
      };
    });
  }
}
