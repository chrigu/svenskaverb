/**
 * Created by christiancueni on 04/02/16.
 */
import {Component} from 'angular2/core'
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { TrainerComponent } from './trainer/trainer.component';

//CSS
require('./static/styles/main.scss');

////general vendor libs
//import 'lodash';
//import 'moment';
//import 'ng2-bootstrap/ng2-bootstrap';
//import '@ngrx/store';

@Component({
    selector: 'app',
    directives: [ROUTER_DIRECTIVES, TrainerComponent],
    template: require('./app.html')
})

//@RouteConfig([
//    { path: '/', name:'Search', component: SearchContainer, useAsDefault: true },
//    { path: '/separator', name:'Separator', component: TermAnalyzerContainer },
//    { path: '/explorer', name:'Explorer', component: ExplorerContainer }
//])

export class App {

    constructor() {}

}
