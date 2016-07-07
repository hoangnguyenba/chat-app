import { Injectable } from '@angular/core';

@Injectable()
export class OptionService {

    public language = "en";
    public isNotification = true;

    constructor() { }

}