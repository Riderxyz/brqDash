import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class TfsService {
    url = 'http://172.20.249.88:8080/tfs/ONS/_apis/wit/wiql?api-version=2.2';
    headers =
        {
            'Postman-Token': '8db614f4-b584-4370-945f-03da7b51e41c',
            'cache-control': 'no-cache',
            'Authorization': 'Basic bmlsdG9uOjQyamxkZjVzdDZwcGdhcXI0dXd3eWk1cHVwY2NzcGNuN3Bjc2p6bnhwc2NkZ2NoNmVsa2E=',
            'Content-Type': 'application/json',
        };
    // tslint:disable-next-line:quotemark
    dt: Date = new Date();

    // tslint:disable-next-line:max-line-length
    body = { "query": "Select *  From WorkItems where [ONS.fornecedor] ='BRQ'  AND [ONS.DataEntrega] >=  '" + this.dt.toISOString().substring(0, 10) + "'" };
    bodyRevision = { "query": "http://172.20.249.88:8080/tfs/ONS/d62f0bbc-23db-4531-8d34-af83d53316fc/_apis/wit/workItems/7235/revisions" };
    json = true;

    constructor(private http: HttpService) {
        //  console.log(this.url)
    }

    recuperarListaWorkItens() {
        console.log(11111);

        return this.http.post(this.url, this.body, { headers: this.headers })
            .pipe(
                map(response => {
                    //    console.log(response.data);
                    return response.data;
                },
                ));

    }


    recuperarListaRevisions() {
        console.log(12222);

        return this.http.post(this.url, this.bodyRevision, { headers: this.headers })
            .pipe(
                map(response => {
                    console.log(response.data);
                    return response.data;
                },
                ));

    }

    recuperarWorkItem(url) {
        //    console.log('chamando ==> ', url);
        try {
            return this.http.get(url, { headers: this.headers })
                .toPromise()
        } catch (error) {
            console.log('error', error);

        }

        /*   return this.http.get(url, { headers: this.headers })
              .pipe(
                  map(response => { response.data }
                  )
              );
      } */
    }
}
