import { Component, OnInit, Input } from '@angular/core';
import { CentralRxJsService } from 'src/service/centralRxjs.service';
import { NgForm } from '@angular/forms';
import { UserObjInterface } from 'src/models/userObj.model';
import { LoginService } from 'src/service/login.service';
import { SelectItemInterface } from 'src/models/SelectItem.model';
import { GetDataService } from 'src/service/getData.service';
import * as moment from 'moment';
import { config } from '../../service/config';
import { NbDialogRef } from '@nebular/theme';
import { ControlsInputRegister } from 'src/models/controlsInputResgister.model';
import { ToastService } from 'src/service/toast.service';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  onRegisterPage = true;
  esteiras: SelectItemInterface[] = [];
  esteirasSelecionadas: any;
  teste = 'primary'
  userObj: UserObjInterface;

  @Input() public modalControl: any;
  constructor(
    public centralRx: CentralRxJsService,
    public loginSrv: LoginService,
    public dataSrv: GetDataService,
    protected dialogRef: NbDialogRef<LoginModalComponent>,
    public toastSrv: ToastService
  ) {
    this.userObj = this.loginSrv.NewUserObj;
    this.centralRx.DataSended.subscribe((res) => {
      if (res === config.rxjsCentralKeys.onRegisterUserSucess) {
        this.dialogRef.close();
      }
    });
  }

  ngOnInit() {
    this.esteiras = this.dataSrv.listaEsteiras();
  }
  onLoginClick(Form: NgForm) {

  }


  onRegisterClick(Form: NgForm) {
    console.log('chamando o serviço', Form.form.valid);
    const errosDeForm = []
    console.log('chamando os controles', Form.form.controls);


    if (Form.form.valid) {
      // this.loginSrv.registerNewUser(this.userObj);

    } else {

    }

    console.log('chamando o log', this.userObj);
    console.log(this.dialogRef)

    // this.userObj.dataNascimento = Number(moment(this.userObj.dataNascimento).format('x'))
    /*   const UserObjFormated = this.userObj;
       UserObjFormated.dataNascimento = Number(moment(this.userObj.dataNascimento).format('x'));
       console.log('item 2', UserObjFormated);  */

  }

  onErrorInputFromRegister(registerErrorObj: ControlsInputRegister) {
    let errorObj = {
      title:'',
      subtitle: ''
    }
    if (registerErrorObj.email.errors.required) {
      errorObj.title = config.errsLabelForToast.input.emailVazio.title
      errorObj.subtitle = config.errsLabelForToast.input.emailVazio.subtitle
this.toastSrv.sendErrorToast(errorObj);
    }
  }
  onDate(event) {
    console.clear()
    console.log(moment(this.userObj.dataNascimento).format('DD/MM/YYYY'));
    console.log(moment(this.userObj.dataNascimento).format('x'));

    const teste = Number(moment(this.userObj.dataNascimento).format('x'))
    console.log(teste)
    // console.log(moment(Number(teste)).format('DD/MM/YYYY'))
    console.log('o que temos aqui?', this.userObj.dataNascimento);

    //this.dataSrv.userData.dataInicio = moment(this.usurObj.dataInicio).format('YYYY/M/DD');
    // this.dataSrv.userData.dataFinal = moment(this.usurObj.dataFinal).format('YYYY/M/DD');

  }
}
