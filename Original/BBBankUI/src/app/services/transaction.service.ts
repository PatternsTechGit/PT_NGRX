import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LineGraphData } from '../models/line-graph-data';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient: HttpClient) { }

  getLast12MonthBalances(userId: string): Observable<LineGraphData> {
    return this.httpClient.get<LineGraphData>(`${environment.apiUrlBase}Transaction/GetLast12MonthBalances/${userId}`);
  }
}
