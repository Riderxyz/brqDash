import { Component, OnInit } from '@angular/core';
import { CentralRxJsService } from 'src/service/centralRxjs.service';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {

  constructor(
    public centralRx: CentralRxJsService
    ) { }

  ngOnInit() {
  }

}
