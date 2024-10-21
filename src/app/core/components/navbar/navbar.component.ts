import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import the RouterModule here
//import { NavbarService } from '../../services/navbarService/navbar.service';
import { OffcanvasService } from '../../services/offcanvasService/offcanvas.service';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
currentTheme: any;
selectedOption: any;
  /**
   * usuario activo
   */
  activeUser: any; //TODO TIPAR
   /**
   * nombre del usuario
   */
   activeUserName: string | undefined;


constructor(
  private offcanvasService: OffcanvasService,
  private usersService: UsersService
){}

ngOnInit(): void {  

  this.usersService.getCurrentUser().subscribe((user) => {
    this.activeUser = user;
    if (this.activeUser) {
      this.activeUserName = this.activeUser.data.user;
      if (this.activeUserName) {
        console.log(this.activeUser);
        
        // this.lettersAvatar(this.activeUserName);
        // this.obtenerPedidos();
      }
    }
  });
}


ngAfterViewInit(): void {
  const offcanvasElement = document.getElementById('offcanvasNavbar');
  if (offcanvasElement) {
    this.offcanvasService.setOffcanvasElement(offcanvasElement);
  }
}

// Método que se llamará al hacer clic en un enlace para cerrar el offcanvas
closeOffcanvas(): void {
  this.offcanvasService.closeOffcanvas();
}

}
