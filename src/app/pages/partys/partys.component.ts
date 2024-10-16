import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UsersService } from '../../core/services/users/users.service';

@Component({
  selector: 'app-partys',
  standalone: true,
  imports: [],
  templateUrl: './partys.component.html',
  styleUrl: './partys.component.css'
})
export class PartysComponent {

  constructor(
    private userService: UsersService
  
  ){}

  ngOnInit(): void {
   this.userService.getUSers().subscribe((element) =>{
    console.log(element);
    
   })
    
  }


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
