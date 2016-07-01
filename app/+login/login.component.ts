import { Component } from '@angular/core';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from '@angular/common';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'login',
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES ],
  templateUrl: 'app/+login/login.component.html',
  styleUrls: ['app/+login/login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService
            ) 
  {
  }

  login(event: Event, username: String, password: String) {
    event.preventDefault();
    
    this.authService.login(username, password);
  }
}
