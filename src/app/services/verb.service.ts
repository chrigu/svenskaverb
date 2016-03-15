/**
 * Created by christiancueni on 15/03/16.
 */
import { Injectable } from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import { Http, Response } from 'angular2/http';


@Injectable()
export class VerbService {

    private verbUrl = '/data/verbs.json';

    constructor (private http: Http) {}

    loadVerbs():Observable<any>  {
        return this.http.get(this.verbUrl)
            .map(res =>  res.json())
            .catch(this.handleError);
    }

    private handleError (error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
