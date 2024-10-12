import { Component } from '@angular/core';

@Component({
  selector: 'app-partys',
  standalone: true,
  imports: [],
  templateUrl: './partys.component.html',
  styleUrl: './partys.component.css'
})
export class PartysComponent {


   obtenerMesActual() {
    const meses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth(); // getMonth() devuelve el índice del mes (0-11)
    
    return meses[mesActual]; // Devuelve el nombre del mes
  }
  

}
