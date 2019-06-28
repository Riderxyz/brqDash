import { Injectable } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';

@Injectable()
export class CentralRxJsService {



  InputStream = new ReplaySubject<any>();
  OutputStrem = new ReplaySubject<any>();
  constructor() { }
}
