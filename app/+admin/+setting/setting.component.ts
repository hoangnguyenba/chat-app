import { Component, OnInit } from '@angular/core';

import { TAB_DIRECTIVES } from 'ng2-bootstrap/components/tabs';

@Component({
    moduleId: module.id,
    selector: 'setting',
    templateUrl: 'setting.component.html',
    directives: [TAB_DIRECTIVES]
})
export class SettingComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}