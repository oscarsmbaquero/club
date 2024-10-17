import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUser } from '../models/user-models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
// import { IProduct } from '../models/product.models';

// import { ThemeService } from '../theme/theme.service';
// import { TranslationService } from '../translateService/translate.service';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  activeUser = '';

  //TODO LLEVARLO A ENVIRONMENTS Y GENERAR KEY
  key = 'encrypt!135790';

  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  public currentUser$: Observable<IUser | null>;

  constructor(private httpClient: HttpClient) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.activeUser = storedUser;
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  /**
   * función de logeo
   * @param credentials
   * @returns
   */
  login(credentials: {
    mail: string;
    password: string;
  }): Observable<{ nombreUsuario: string | null; success: boolean }> {
    const endpoint = `${environment.apiUrl}users/login`;

    // Encriptar la contraseña
    const encryptedPassword = CryptoJS.AES.encrypt(
      credentials.password,
      this.key
    ).toString();

    const encryptedCredentials = {
      user: credentials.mail,
      password: encryptedPassword,
    };

    return this.httpClient.post<IUser>(endpoint, encryptedCredentials).pipe(
      map((user) => {
        if (user) {
          this.currentUserSubject.next(user);
          const userTheme = user.data?.theme; // Obtener el tema del usuario
          const userLanguage = user.data?.language; // Obtener el idioma del usuario
          const nombreUsuario = user.data?.user ?? null; // Asegurar que sea string o null

          // if (userTheme && userLanguage) {
          //   this.themeService.initializeTheme(userTheme); // Establecer el tema en ThemeService
          //   this.translationService.changeLanguage(userLanguage); // Establecer el idioma en TranslationService
          // }

          localStorage.setItem('user', JSON.stringify(user));

          // Devuelve un objeto con nombreUsuario y true como success
          return { nombreUsuario, success: true };
        } else {
          // Devuelve un objeto con null para nombreUsuario y false como success
          return { nombreUsuario: null, success: false };
        }
      })
    );
  }

  /**
   * registro de usuario
   * @param credentials
   * @returns
   */
  register(credentials: {
    user: string;
    password: string;
    mail: string;
  }): Observable<boolean> {
    const endpoint = `${environment.apiUrl}users/register`;
    // Encriptar la contraseña
    console.log(credentials);

    const encryptedPassword = CryptoJS.AES.encrypt(
      credentials.password,
      this.key
    ).toString();
    const encryptedCredentials = {
      user: credentials.user,
      password: encryptedPassword,
      mail: credentials.mail,
    };
    return this.httpClient.post<IUser>(endpoint, encryptedCredentials).pipe(
      map((user) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      })
    );
  }

  /**
   * Obtenemos los clientes
   * @returns 
   */
  getUSers() {
    return this.httpClient.get<IUser[]>(`${environment.apiUrl}users`);
  }

  /**
   * clientes por id
   * @param id 
   * @returns 
   */
  getUSerById(id: string) {
    return this.httpClient.get<IUser[]>(`${environment.apiUrl}users/${id}`);
  }
  //TODO. POSIBLEMENTE SE NECESITEN

  // resetPassword(email: any): Observable<any> {
  //   const url = `${environment.apiUrl}users/reset-password/${email}`;
  //   return this.httpClient.post<IUser[]>(url, email);
  // }

  // changePassword(id: string, nuevaContrasena: string): Observable<any> {
  //   return this.httpClient.post(`${environment.apiUrlMock}users/changePassword/${id}`,{ nuevaContrasena });
  // }
  // changePassword(id: string, nuevaContrasena: string): Observable<any> {
  //   const token = localStorage.getItem('authToken');
  //   // Cifrar la contraseña
  //   const encryptedPassword = CryptoJS.AES.encrypt(
  //     nuevaContrasena,
  //     this.key
  //   ).toString();
  //   return this.httpClient.post(
  //     `${environment.apiUrl}users/changePassword/${id}`,
  //     { nuevaContrasena: encryptedPassword },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  // }
}
