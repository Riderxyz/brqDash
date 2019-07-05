import { Component, OnInit } from '@angular/core';
import { CentralRxJsService } from 'src/service/centralRxjs.service';
import { NgForm } from '@angular/forms';
import { UserObjInterface } from 'src/models/userObj.model';
import { LoginService } from 'src/service/login.service';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
onRegisterPage = false;

userObj:UserObjInterface;
  constructor(
    public centralRx: CentralRxJsService,
    public loginSrv: LoginService
    ) {
this.userObj = this.loginSrv.NewUserObj;

    }

  ngOnInit() {
  }
  onLoginClick(Form: NgForm){

  }
}
