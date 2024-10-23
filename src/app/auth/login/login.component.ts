import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // Import the RouterModule here
import { UsersService } from '../../core/services/users/users.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: '../auth-styles.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersServices : UsersService,
    private router: Router
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

    this.usersServices.login(user).subscribe(
      (response: any) => {        
        // Manejo de la respuesta exitosa (200)
        if ( response.success) {
          const nombreUser = response.nombreUsuario;
          this.router.navigate(['/partys'])
        }
      },
      (error) => {
        // Manejo de errores
        if (error.status === 404) {
          // Usuario no encontrado
          console.error('User not found:', error);
          // const translatedMessage = this.translate.instant(
          //   'NOTIFICACIONES.USUARIO-NO-EXISTE'
          // );
          // console.log(translatedMessage);
        } else if (error.status === 500) {
          // Error en el servidor
          console.error('Server error:', error);
          // const translatedMessage = this.translate.instant(
          //   'NOTIFICACIONES.ERROR-SERVIDOR'
          // );
          // console.log(translatedMessage);
        } else {
          // Otros errores
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