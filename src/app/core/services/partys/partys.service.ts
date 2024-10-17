import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PartysService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  //TODO HAY QUE CAMBIAR PARTYS POR EVENTS
  /**
   * Obtenermos las fiestas 
   */
  getPartys() {    
    return this.httpClient.get<any[]>(`${environment.apiUrl}parties`);
  }

  /**
   * Funcion para añadir fiestas 
   */
  addParty(body: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', body.name);
    formData.append('description', body.description);
    formData.append('fecha', body.fecha);
    formData.append('image', body.image);
    
    return this.httpClient.post<any>(
      `${environment.apiUrl}parties/addParty`,
      formData
    );
  }
}
