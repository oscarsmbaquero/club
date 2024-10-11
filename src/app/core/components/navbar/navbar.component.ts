import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import the RouterModule here
//import { NavbarService } from '../../services/navbarService/navbar.service';
import { OffcanvasService } from '../../services/offcanvasService/offcanvas.service';

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


constructor(private offcanvasService: OffcanvasService){

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
