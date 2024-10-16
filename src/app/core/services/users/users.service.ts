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

  key = 'encrypt!135790';

  private currentUserSubject = new BehaviorSubject<IUser | null>(null);
  public currentUser$: Observable<IUser | null>;

  constructor(
    private httpClient: HttpClient,
    // private themeService: ThemeService,
    // private translationService: TranslationService
  ) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.activeUser = storedUser;
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  login(credentials: { mail: string; password: string }): Observable<{ nombreUsuario: string | null, success: boolean }> {
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

  getCurrentUser(): Observable<IUser | null> {
    return this.currentUserSubject.asObservable();
  }

  setCurrentUser(user: IUser) {
    this.currentUserSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearCurrentUser() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
  }

  // getOrderClient(userId: string): Observable<any> {
  //   //return this.httpClient.get(`URL_DE_TU_API/pedidos/${userId}`);
  //   return this.httpClient.get<any[]>(
  //     `${environment.apiUrl}users/${userId}`
  //   );
  // }

  getUSers() {    
    return this.httpClient.get<IUser[]>(`${environment.apiUrl}users`);
  }

  getUSerById(id: string) {
    return this.httpClient.get<IUser[]>(`${environment.apiUrl}users/${id}`);
  }
  updatedUser(id: string, userData: any): Observable<IUser[]> {
    const url = `${environment.apiUrl}users/modify/${id}`;
    return this.httpClient.put<IUser[]>(url, userData);
  }

  getUSerByMail(email: string) {
    return this.httpClient.get<IUser>(
      `${environment.apiUrl}users/mail/${email}`
    );
  }

  // getUSerByMail(email: string): Observable<string> {
  //   // Mapear la respuesta para extraer solo el email
  //   return this.httpClient.get<IUser>(`${environment.apiUrlMock}users/mail/${email}`).pipe(
  //     map((user: IUser) => user.mail)
  //   );
  // }

  resetPassword(email: any): Observable<any> {
    const url = `${environment.apiUrl}users/reset-password/${email}`;
    return this.httpClient.post<IUser[]>(url, email);
  }

  // changePassword(id: string, nuevaContrasena: string): Observable<any> {
  //   return this.httpClient.post(`${environment.apiUrlMock}users/changePassword/${id}`,{ nuevaContrasena });
  // }
  changePassword(id: string, nuevaContrasena: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    // Cifrar la contraseña
    const encryptedPassword = CryptoJS.AES.encrypt(
      nuevaContrasena,
      this.key
    ).toString();
    return this.httpClient.post(
      `${environment.apiUrl}users/changePassword/${id}`,
      { nuevaContrasena: encryptedPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
  //To encrypt input data
  // public encrypt(password: string): string {
  //   return CryptoJS.AES.encrypt(password, this.key).toString();
  // }

  /**
   * Funcion para cambiar los ajustes de apariencia y lenguaje
   * @param language
   * @param theme
   * @param user
   * @returns
   */
  saveSettings(language?: string, theme?: string, user?: string) {
    const payload = {
      language: language,
      theme: theme,
    };
    return this.httpClient.put<any[]>(
      `${environment.apiUrl}users/settings/${user}`,
      payload
    );
  }
}
