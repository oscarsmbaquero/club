import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Message } from 'primeng/api';
import { NotificationService } from '../../core/services/notificationService/notificationService';
import { UsersService } from '../../core/services/users/users.service';


@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: '../auth-styles.css'
})
export class ResetPasswordComponent {

  public resetPassword: FormGroup;
  public submitted: boolean = false;
  mail = '';
  logoUrl = '';

  /**
   * pintar mensaje de error si no existe el mail de cliente
   */
  showEmailError = false;
  messages: Message[] = [];
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private usersService: UsersService,
    private router: Router
  ){
    this.resetPassword = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.messages = [
      {
        severity: 'error',
        summary: '',
        detail: 'No existe cliente con ese mail',
      },
    ];
}

public onSubmit(): void {
  this.loading = true;
  this.submitted = true;

  if (this.resetPassword.valid) {
    const email = this.resetPassword.get('mail')?.value;

    // Llamada al servicio para obtener el email
    this.usersService.getUSerByMail(email).subscribe(
      (response: any) => {
        console.log(response);

        if (response && response.status === 200) {
          const userMail = response.data.mail; 
          console.log('Correo encontrado: ', userMail);

          // Llamada al servicio para resetear la contraseña usando el correo recibido
          this.usersService.resetPassword(userMail).subscribe(
            (response) => {
              this.loading = false;
              this.notificationService.showNotification(
                'success',
                'Hemos enviado un enlace a tu email'
              );
              this.router.navigate(['user/login']);
            },
            (error) => {
              this.loading = false;
              console.error('Error al enviar los datos', error);
              this.notificationService.showNotification(
                'error',
                'Error al enviar los datoss'
              );
            }
          );
        } else if (response && response.status === 404) {
          console.log('Correo no encontrado');
          this.loading = false;
          this.notificationService.showNotification(
            'error',
            'Correo no encontrado'
          );
        }
      },
      (error) => {
        this.loading = false;
        console.error('Error en la búsqueda del email: ', error);
        if (error.status === 404) {
          // this.snackBar.open('El correo no existe en nuestra base de datos.', 'Cerrar', {
          //   duration: 3000,
          // });
          this.notificationService.showNotification(
            'error',
            'El correo no existe en nuestra base de datos'
          );
        } else {
          this.notificationService.showNotification(
            'error',
            'Ocurrió un error, por favor intente de nuevo'
          );
        }
      }
    );
  }
}
}
