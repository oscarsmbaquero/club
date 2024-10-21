import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { UsersService } from '../../core/services/users/users.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usersServices : UsersService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login form submitted:', this.loginForm.value);
      const user: any = {
        mail: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      };
      this.usersServices.login(user).subscribe(
        (response) => {
          //this.loading = false;
          console.log(response);          
          const nombreUser = response.nombreUsuario
          console.log(nombreUser);
          
          
          // const translatedMessage = this.translate.instant(
          //   'NOTIFICACIONES.CREDENCIALES-OK',
          //   { email: nombreUser }
          // );

    })
  }
}
}