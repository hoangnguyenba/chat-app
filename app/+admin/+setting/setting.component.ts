import { Component, OnInit } from '@angular/core';

import { TAB_DIRECTIVES } from 'ng2-bootstrap/components/tabs';

import { OptionService } from '../../shared';

@Component({
    moduleId: module.id,
    selector: 'setting',
    templateUrl: 'setting.component.html',
    directives: [TAB_DIRECTIVES]
})
export class SettingComponent implements OnInit {

    public languages = {
        en : 'English',
        jp: 'Japanese'
    };

    public selectedLanguage = 'en';

    constructor(
        public optionService: OptionService
    ) { }

    ngOnInit() { }
}