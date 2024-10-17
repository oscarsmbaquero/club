import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

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
}
