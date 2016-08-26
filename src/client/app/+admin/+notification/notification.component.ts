import { Component } from '@angular/core';

import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/components/dropdown';

import { TextService } from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'notification',
    templateUrl: 'notification.component.html',
    directives: [DROPDOWN_DIRECTIVES],
    styleUrls: ['notification.component.css']
})
export class NotificationComponent {

    constructor(
        private textService: TextService
    ) { }
}
