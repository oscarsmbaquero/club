import { Component } from '@angular/core';
//servicios
import { UsersService } from '../../../core/services/users/users.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
//pipe
import { DefaultValuePipe } from '../../../shared/pipes/default-value.pipe';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoadingComponent, DefaultValuePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  //TODO TIPAR CUANDO TENGAMOS TODOS LOS DATOS DEL CLIENTE
  user: any;
  loading = false;

  constructor(
    private usersService: UsersService
  ){}

  ngOnInit(): void {    
    this.loading = true;
    const userId = this.getUserId();
    if (userId) {
      this.getUserIdBack(userId)
      
    }
  }
  getUserId(): string | null {
    // Recupera y parsea el ID del usuario desde localStorage
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData).data.id : null;
  }

  getUserIdBack(userId: string){
    this.usersService.getUSerById(userId).subscribe((element)=>{
      this.loading = false;
      this.user= element;
      
    })
  }
}
