import {Component} from 'angular2/core'
import {Observable} from "rxjs/Observable";
import {VerbService} from '../services/verb.service';
import {LanguageSelectorComponent} from './langSelector.component';
import {VerbPanelComponent} from './verbPanel.component';

@Component({
    selector: 'trainer',
    directives: [LanguageSelectorComponent, VerbPanelComponent],
    providers: [VerbService],
    template: require('./trainer.component.html')
})

export class TrainerComponent
{
    private currentVerb$:Observable<Object>;
    private verbState:boolean = true;

    constructor(private verbService:VerbService) {
        this.currentVerb$ = this.verbService.newVerb$;
        this.verbService.getVerb();
    }

    showSolution() {
        this.verbState = false;
    }

    getNewVerb() {
        this.verbService.getVerb();
        this.verbState = true;
    }

    changeLanguage(lang:string) {
        console.log(lang);
    }

}