import { Component, OnInit } from '@angular/core';
import { CentralRxJsService } from 'src/service/centralRxjs.service';
import { NgForm } from '@angular/forms';
import { UserObjInterface } from 'src/models/userObj.model';
import { LoginService } from 'src/service/login.service';
import { SelectItemInterface } from 'src/models/SelectItem.model';
import { GetDataService } from 'src/service/getData.service';
import * as moment from 'moment'
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
onRegisterPage = false;
esteiras: SelectItemInterface[] = [];
esteirasSelecionadas: any;
userObj:UserObjInterface;
  constructor(
    public centralRx: CentralRxJsService,
    public loginSrv: LoginService,
    public dataSrv: GetDataService
    ) {
 this.userObj = this.loginSrv.NewUserObj; 

    }

  ngOnInit() {
    this.esteiras = this.dataSrv.listaEsteiras();
  }
  onLoginClick(Form: NgForm){

  }


  onRegisterClick(Form: NgForm) {
    this.loginSrv.registerNewUser(this.userObj)
  }

  onDate(event) {
    console.log(moment(this.userObj.dataNascimento).format('YYYY/M/DD'));
     //this.dataSrv.userData.dataInicio = moment(this.usurObj.dataInicio).format('YYYY/M/DD');
    // this.dataSrv.userData.dataFinal = moment(this.usurObj.dataFinal).format('YYYY/M/DD');
    
  }
}
