import { Component, OnInit } from '@angular/core';
import { CentralRxJsService } from 'src/service/centralRxjs.service';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
onRegisterPage = false;
  constructor(
    public centralRx: CentralRxJsService
    ) { }

  ngOnInit() {
  }

}
