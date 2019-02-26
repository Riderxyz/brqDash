import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class TfsService {
    url = 'http://172.20.249.88:8080/tfs/ONS/_apis/wit/wiql?api-version=2.2'
    headers =
        {
            'Postman-Token': '7cebd0bf-cbb3-4c0a-9147-7ec1e26ec3a1',
            'cache-control': 'no-cache',
            'Authorization': 'Basic bmlsdG9uOjQyamxkZjVzdDZwcGdhcXI0dXd3eWk1cHVwY2NzcGNuN3Bjc2p6bnhwc2NkZ2NoNmVsa2E=',
            'Content-Type': 'application/json',
        };
    // tslint:disable-next-line:quotemark
    body = { "query": "Select *  From WorkItems where [ONS.fornecedor] ='BRQ' " };
    json = true;


    constructor(private http: HttpService) {

    }

    recuperarListaWorkItens() {
        console.log(11111);

        return this.http.post(this.url, this.body, { headers: this.headers })
            .pipe(
                map(response => response.data)
            )


    }

}
