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

  getPartys() {    
    return this.httpClient.get<any[]>(`${environment.apiUrl}parties`);
  }

  addParty(body: any): Observable<any> {
    const formData = new FormData();
    console.log(body);
    
    //console.log(body, 'bodyasdad');
    formData.append('name', body.name);
    formData.append('description', body.description);
    formData.append('fecha', body.fecha);
    formData.append('image', body.image);
    //formData.append('date', body.date);

    return this.httpClient.post<any>(
      `${environment.apiUrl}parties/addParty`,
      formData
    );
  }
}
