import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from '../../core/services/jwt/jwt.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { UsersService } from '../../core/services/users/users.service';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [ReactiveFormsModule, FloatLabelModule],
  templateUrl: './new-password.component.html',
  styleUrl: '../auth-styles.css'
})
export class NewPasswordComponent implements OnInit{
  public newPassword: FormGroup;
  public submitted: boolean = false;
  userId = '';
  userName = '';

  constructor(
    private route: ActivatedRoute,
    private jwtService: JwtService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
  ){
    this.newPassword = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const token = params['token'];
      localStorage.setItem('authToken', token);
      const decodeToken = this.jwtService.decodeToken(token);
      this.userId = decodeToken.id;
      //this.userName = decodeToken.mail;
    });
  }
  public onSubmit(): void {
    this.submitted = true;
    if (this.newPassword.valid) {
      const user: any = {
        password: this.newPassword.get('password')?.value,
        confirmPassword: this.newPassword.get('confirmPassword')?.value,
      };      
      this.usersService
        .changePassword(this.userId, user.password)
        .subscribe((response) => {});
      this.router.navigate(['/login']);
    }
  }
}
