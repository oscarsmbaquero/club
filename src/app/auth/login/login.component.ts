import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { UsersService } from '../../core/services/users/users.service';
import { NotificationService } from '../../core/services/notificationService/notificationService';
import { LoadingComponent } from '../../shared/components/loading/loading/loading.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: '../auth-styles.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  
  /**
   * flag para pintar el loading
   */
  loading = false;

  constructor(
    private fb: FormBuilder,
    private usersServices : UsersService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

onSubmit() {
  if (this.loginForm.valid) {
    const user: any = {
      mail: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.loading = true;
    this.usersServices.login(user).subscribe(
      (response: any) => {                
        // Manejo de la respuesta exitosa (200)
        if ( response.success) {
          this.loading = false;
          this.notificationService.showNotification(
            'success',
            `Bienvenido, ${response.nombreUsuario}`
          );
          //this.notificationService.showNotification('success', 'Login exitoso', 'Bienvenido');
          const nombreUser = response.nombreUsuario;
          this.router.navigate(['/partys'])
        }
      },
      (error) => {
        // Manejo de errores
        if (error.status === 404) {
          // Usuario no encontrado
          this.loading = false;
          console.error('User not found:', error);
          this.notificationService.showNotification(
            'error',
            `Usuario no encontrado`
          );
        } else if (error.status === 401) {
          // Usuario no encontrado
          this.loading = false;
          console.error('User not found:', error);
          this.notificationService.showNotification(
            'error',
            `Usuario o contraseña incorrectos`
          );
        }
        else if (error.status === 500) {
          this.loading = false;
          // Error en el servidor
          console.error('Server error:', error);
          this.notificationService.showNotification(
            'error',
            `Error en el servidor, intentelo de nuevo`
          );
        } else {
          // Otros errores
          this.loading = false;
          console.error('Unexpected error:', error);
          // const translatedMessage = this.translate.instant(
          //   'NOTIFICACIONES.ERROR-DESCONOCIDO'
          // );
          // console.log(translatedMessage);
        }
      }
    );
  }
}
}