import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
//servicios
import { UsersService } from '../../../core/services/users/users.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [TableModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  //TODO TIPAR
  clients : any

  constructor(
    private usersService: UsersService
  ){

  }

  ngOnInit(): void {
    
    this.usersService.getUSers().subscribe((element) =>{
      this.clients = element;
      console.log(element);
      
    })
  }


}
