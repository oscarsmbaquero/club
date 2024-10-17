import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UsersService } from '../../core/services/users/users.service';
import { PartysService } from '../../core/services/partys/partys.service';

@Component({
  selector: 'app-partys',
  standalone: true,
  imports: [],
  templateUrl: './partys.component.html',
  styleUrl: './partys.component.css',
})
export class PartysComponent {
  //TO TIPAR
  partys: any;

  constructor(private partysService: PartysService) {}

  ngOnInit(): void {
    this.getPartis();
  }

  /**
   * Obtiene las fiestas ya creadas
   */
  getPartis() {
    this.partysService.getPartys().subscribe((element) => {
      this.partys = this.formatDates(element);
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
