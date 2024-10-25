import { Component } from '@angular/core';
//servicios
import { UsersService } from '../../../core/services/users/users.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
//pipe
import { DefaultValuePipe } from '../../../shared/pipes/default-value.pipe';
//primeng
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LoadingComponent, DefaultValuePipe, AvatarModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  //TODO TIPAR CUANDO TENGAMOS TODOS LOS DATOS DEL CLIENTE
  user: any;
  userName = '';
  loading = false;
  palabrasAvatar = '';

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
    const userName = userData ? JSON.parse(userData).data.user : '';
    this.lettersAvatar(userName);
    return userData ? JSON.parse(userData).data.id : null;
  }

  getUserIdBack(userId: string){
    this.usersService.getUSerById(userId).subscribe((element)=>{
      this.loading = false;
      this.user= element;
      
      
    })
  }

   /**
   * funcion para pintar el nombre del avatar, solo la primera letra de las dos primeras palabras
   * @param cadena
   * @param cantidadLetras
   */
   lettersAvatar(cadena: string, cantidadLetras = 1) {
    const palabras = cadena.split(' ');
    // Solo las dos primeras palabras
    const primerasDosPalabras = palabras.slice(0, 2);
    // Iterar sobre cada palabra y extraer las letras especificadas
    const letrasExtraidas = primerasDosPalabras.map((palabra) => {
      return palabra.slice(0, cantidadLetras);
    });
    const resultado = letrasExtraidas.join('');
    this.palabrasAvatar = resultado;
  }
}
