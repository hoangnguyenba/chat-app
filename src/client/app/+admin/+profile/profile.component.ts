import { Component, OnInit } from '@angular/core';
import { ContentHeaderService } from '../shared/index';
import { TextService } from '../../shared/index';

@Component({
    moduleId: module.id,
    selector: 'profile',
    templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {

    constructor(
        private contentHeaderService: ContentHeaderService,
        private textService: TextService
    ) { }

    ngOnInit() {
        this.contentHeaderService.title = this.textService.get('profile');
    }
}
