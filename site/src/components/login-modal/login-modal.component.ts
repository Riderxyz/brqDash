import { Component, OnInit } from '@angular/core';
import { CentralRxJsService } from 'src/service/centralRxjs.service';
import { NgForm } from '@angular/forms';
import { UserObjInterface } from 'src/models/userObj.model';
import { LoginService } from 'src/service/login.service';
import { SelectItemInterface } from 'src/models/SelectItem.model';
import { GetDataService } from 'src/service/getData.service';
import * as moment from 'moment'
import { config } from '../../service/config';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
onRegisterPage = false;
esteiras: SelectItemInterface[] = [];
esteirasSelecionadas: any;
teste = 'primary'
userObj:UserObjInterface;
  constructor(
    public centralRx: CentralRxJsService,
    public loginSrv: LoginService,
    public dataSrv: GetDataService
    ) {
 this.userObj = this.loginSrv.NewUserObj; 
 this.centralRx.DataSended.subscribe((res) => {
  if (res === config.rxjsCentralKeys.onRegisterUserSucess) {
  }
});
    }

  ngOnInit() {
    this.esteiras = this.dataSrv.listaEsteiras();
  }
  onLoginClick(Form: NgForm){

  }


  onRegisterClick(Form: NgForm) {
    console.log('chamando o serviço', Form);
    console.log('chamando o log', this.userObj);
    const UserObjFormated = this.userObj;
    UserObjFormated.dataNascimento = Number(moment(this.userObj.dataNascimento).format('x'));
     this.loginSrv.registerNewUser(UserObjFormated);
  }

  onDate(event) {
    console.clear()
    console.log(moment(this.userObj.dataNascimento).format('DD/MM/YYYY'));
    console.log(moment(this.userObj.dataNascimento).format('x'));

    const teste = Number(moment(this.userObj.dataNascimento).format('x'))
    console.log(teste)
   // console.log(moment(Number(teste)).format('DD/MM/YYYY'))
    console.log('o que temos aqui?',this.userObj.dataNascimento);
    
     //this.dataSrv.userData.dataInicio = moment(this.usurObj.dataInicio).format('YYYY/M/DD');
    // this.dataSrv.userData.dataFinal = moment(this.usurObj.dataFinal).format('YYYY/M/DD');
    
  }
}
