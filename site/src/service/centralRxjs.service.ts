import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';

@Injectable()
export class CentralRxJsService {



  private InputStream = new ReplaySubject<any>();
  public OutputStrem = this.InputStream.asObservable();
  constructor() { }





public set sendData(value) {
  this.InputStream.next(value);
}

public get DataSended() {
  return this.OutputStrem;
}


}
