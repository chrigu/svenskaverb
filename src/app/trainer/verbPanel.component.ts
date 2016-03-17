import {Component, Input} from 'angular2/core'

@Component({
    selector: 'verb-panel',
    template: require('./verbPanel.component.html')
})

export class VerbPanelComponent {

    @Input() verb;
    @Input() showSolution;

    constructor() {}

}