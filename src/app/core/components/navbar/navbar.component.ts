import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import the RouterModule here
import { NavbarService } from '../../services/navbarService/navbar.service';

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


constructor(private navbarService: NavbarService){

}

selectOption(option: string) {
  this.navbarService.setSelectedOption(option);
  //this.selectedOption = option;
  this.toggleNavbar();
}

toggleNavbar() {
    this.navbarService.collapseNavbar();
    
  }

}
