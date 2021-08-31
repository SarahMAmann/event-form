import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Band } from '../models/bands.model'
import { environment } from '@env/environment'
import { first, delay } from 'rxjs/operators'
import { Observable, of } from 'rxjs'

enum ep {
    GetBandsList = '/bands'
}

@Injectable()
export class BandsService {
    constructor(private http: HttpClient) { }

    getBandsList$(): Observable<Array<Band>> {
        return this.http
            .get<Array<Band>>(environment.apiUrl + ep.GetBandsList)
            .pipe(first());
    }

    getBandsData() {
        return 'data';
    }
}