import {Component} from 'angular2/core'
import {VerbService} from '../services/verb.service';
import {LanguageSelectorComponent} from './langSelector.component';
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'trainer',
    directives: [LanguageSelectorComponent],
    providers: [VerbService],
    template: require('./trainer.component.html')
})

export class TrainerComponent
{
    private verbList$:Observable<Object>;

    constructor(private verbService:VerbService) {
        this.verbList$ = this.verbService.loadVerbs();
        this.verbList$.subscribe( data => console.log(data));
    }

    changeLanguage(lang:string) {
        console.log(lang);
    }

}