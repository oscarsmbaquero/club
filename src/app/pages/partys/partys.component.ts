import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UsersService } from '../../core/services/users/users.service';
import { PartysService } from '../../core/services/partys/partys.service';

@Component({
  selector: 'app-partys',
  standalone: true,
  imports: [],
  templateUrl: './partys.component.html',
  styleUrl: './partys.component.css'
})
export class PartysComponent {

  partys : any

  constructor(
    private partysService: PartysService
  
  ){}

  ngOnInit(): void {
   this.partysService.getPartys().subscribe((element) =>{
    this.partys = element;
    console.log(this.partys);
    
    
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
