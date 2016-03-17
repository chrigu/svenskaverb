/**
 * Created by christiancueni on 15/03/16.
 */
import { Injectable } from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import { Http, Response } from 'angular2/http';


@Injectable()
export class VerbService {

    private verbUrl = '/data/verbs.json';
    private verbs:Object[] = [];

    constructor (private http: Http) {}

    loadVerbs()  {
        return this.http.get(this.verbUrl)
            .map(res => res.json())
            .catch(this.handleError)
            .map((list) => {

                this.verbs = [];

                for (let key in list) {
                    console.log(key);
                    let verbs = list[key].map((verb) => {
                        let verbObj = {
                            verbs: verb,
                            type: key
                        };
                        return verbObj;
                    });
                    this.verbs = this.verbs.concat(verbs);
                }
                return this.verbs;
            });
    }

    getVerb() {
        console.log(Math.floor(Math.random() * this.verbs.length));
        return this.verbs[Math.floor(Math.random() * this.verbs.length)];
    }

    getRandomVerb():Observable<any> {
        if (this.verbs.length === 0) {
            return this.loadVerbs()
        } else {
            return Observable.of(this.verbs);
        }
    }

    private handleError (error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
