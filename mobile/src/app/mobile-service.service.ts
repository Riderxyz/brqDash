import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  private _DataDimensionado = {};

  get Data() { return this._DataDimensionado; }
  constructor(private http: HttpClient) {

  }

  public getWorkItens() {
    return this.http.get('http://10.2.1.127:9700/getWorkItem')
      .subscribe(data => {
        console.log('dados', data);
        this._DataDimensionado = data;
        return data;
      });
  }
}
