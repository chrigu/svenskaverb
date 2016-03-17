/**
 * Created by christiancueni on 15/03/16.
 */
import { Injectable } from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/subject/BehaviorSubject';
import { Http, Response } from 'angular2/http';


@Injectable()
export class VerbService {

    private verbUrl = '/data/verbs.json';
    private verbs:Object[] = [];
    public newVerb$ = new BehaviorSubject<Object>(null);

    constructor (private http: Http) {
        this.loadVerbs().subscribe(x => console.log(x));
    }

    private loadVerbs()  {
        return this.http.get(this.verbUrl)
            .map(res => res.json())
            .catch(this.handleError)
            .map((list) => {
                this.verbs = [];
                for (let key in list) {
                    let verbs = list[key].map((verb) => {
                        return {
                            verbs: verb,
                            type: key
                        };
                    });
                    this.verbs = this.verbs.concat(verbs);
                }
                return this.verbs;
            });
    }

    private getRandomVerb() {
        return this.verbs[Math.floor(Math.random() * this.verbs.length)];
    }

    getVerb() {
        if (this.verbs.length === 0) {
            this.loadVerbs()
                .subscribe((verbs) => {
                    this.newVerb$.next(this.getRandomVerb());
                });
        } else {
            this.newVerb$.next(this.getRandomVerb());
        }
    }

    private handleError (error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
