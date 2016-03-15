import {Component, Input, Output, EventEmitter} from 'angular2/core'

@Component({
    selector: 'lang-selector',
    template: require('./langSelector.component.html')
})

export class LanguageSelectorComponent
{

    @Input() language:string;
    @Output() onChange = new EventEmitter(false);

    constructor()
    {
    }

}