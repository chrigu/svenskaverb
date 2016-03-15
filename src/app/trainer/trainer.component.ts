import {Component} from 'angular2/core'
import {LanguageSelectorComponent} from './langSelector.component';

@Component({
    selector: 'trainer',
    directives: [LanguageSelectorComponent],
    template: require('./trainer.component.html')
    //template: '<h1>Hello</h1>'
})

export class TrainerComponent
{

    constructor() {}

    changeLanguage(lang:string) {
        console.log(lang);
    }

}